import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock the server supabase module before importing the route
const mockRpc = vi.fn();
const mockInsert = vi.fn();
const mockFrom = vi.fn();
const mockRpcFallback = vi.fn();
const mockInsertFallback = vi.fn();
const mockFromFallback = vi.fn();

vi.mock("@/lib/supabase-server", () => ({
  hasServerSupabaseConfig: () => true,
  getServerSupabaseClients: () => [
    {
      rpc: mockRpc,
      from: mockFrom,
    },
    {
      rpc: mockRpcFallback,
      from: mockFromFallback,
    },
  ],
}));

// Import after mocks are in place
const { GET, POST } = await import("@/app/api/poll/route");

const ARTISTS = [
  "Rudy La Escala",
  "Elena Rose",
  "José Feliciano",
  "Servando y Florentino",
];

function makeRequest(opts: { method?: string; body?: unknown; cookies?: string; ip?: string } = {}): Request {
  return new Request("http://localhost/api/poll", {
    method: opts.method ?? "GET",
    headers: {
      ...(opts.body ? { "Content-Type": "application/json" } : {}),
      ...(opts.cookies ? { cookie: opts.cookies } : {}),
      "x-forwarded-for": opts.ip ?? "1.2.3.4",
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
}

describe("GET /api/poll", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRpcFallback.mockReset();
    mockInsertFallback.mockReset();
    mockFromFallback.mockReset();
  });

  it("returns zero counts for all artists when RPC returns empty data", async () => {
    mockRpc.mockResolvedValue({ data: [], error: null });

    const res = await GET();
    const json = await res.json();

    expect(res.status).toBe(200);
    ARTISTS.forEach((artist) => {
      expect(json.counts[artist]).toBe(0);
    });
  });

  it("returns correct counts from RPC data", async () => {
    mockRpc.mockResolvedValue({
      data: [
        { artist_name: "Elena Rose", vote_count: 10 },
        { artist_name: "Rudy La Escala", vote_count: 5 },
      ],
      error: null,
    });

    const res = await GET();
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.counts["Elena Rose"]).toBe(10);
    expect(json.counts["Rudy La Escala"]).toBe(5);
    expect(json.counts["José Feliciano"]).toBe(0);
  });

  it("falls back to row scan when RPC errors", async () => {
    mockRpc.mockResolvedValue({ data: null, error: { message: "rpc error" } });
    mockFrom.mockReturnValue({
      select: () =>
        Promise.resolve({
          data: [
            { artist_name: "Elena Rose" },
            { artist_name: "Elena Rose" },
            { artist_name: "Rudy La Escala" },
          ],
          error: null,
        }),
    });

    const res = await GET();
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.counts["Elena Rose"]).toBe(2);
    expect(json.counts["Rudy La Escala"]).toBe(1);
  });

  it("returns 500 on unexpected error", async () => {
    mockRpc.mockRejectedValue(new Error("DB down"));
    mockRpcFallback.mockRejectedValue(new Error("DB still down"));

    const res = await GET();
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.offline).toBe(true);
  });

  it("falls back to the secondary configured client when the preferred one fails", async () => {
    mockRpc.mockResolvedValue({ data: null, error: { message: "rpc error" } });
    mockFrom.mockReturnValue({
      select: () => Promise.resolve({ data: null, error: { message: "missing relation" } }),
    });

    mockRpcFallback.mockResolvedValue({
      data: [{ artist_name: "Elena Rose", vote_count: 7 }],
      error: null,
    });

    const res = await GET();
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.counts["Elena Rose"]).toBe(7);
  });
});

describe("POST /api/poll", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFrom.mockReturnValue({ insert: mockInsert });
    mockFromFallback.mockReturnValue({ insert: mockInsertFallback });
  });

  it("inserts a valid vote and returns 200", async () => {
    mockInsert.mockResolvedValue({ error: null });

    const req = makeRequest({ method: "POST", body: { artist_name: "Elena Rose" }, ip: "10.0.0.1" });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(mockInsert).toHaveBeenCalledWith({ artist_name: "Elena Rose" });
  });

  it("rejects invalid artist name with 400", async () => {
    const req = makeRequest({ method: "POST", body: { artist_name: "Not An Artist" }, ip: "10.0.0.2" });
    const res = await POST(req);

    expect(res.status).toBe(400);
  });

  it("rejects missing body with 400", async () => {
    const req = new Request("http://localhost/api/poll", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.3" },
      body: "not-json",
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
  });

  it("rejects when vote cookie is already set", async () => {
    const req = makeRequest({
      method: "POST",
      body: { artist_name: "Elena Rose" },
      cookies: "qcs_poll_voted=1",
      ip: "10.0.0.4",
    });
    const res = await POST(req);

    expect(res.status).toBe(429);
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("returns 500 when DB insert fails", async () => {
    mockInsert.mockResolvedValue({ error: { message: "db error" } });
    mockInsertFallback.mockResolvedValue({ error: { message: "db error" } });

    const req = makeRequest({ method: "POST", body: { artist_name: "Elena Rose" }, ip: "10.0.0.5" });
    const res = await POST(req);

    expect(res.status).toBe(503);
  });

  it("sets the voted cookie on success", async () => {
    mockInsert.mockResolvedValue({ error: null });

    const req = makeRequest({ method: "POST", body: { artist_name: "Elena Rose" }, ip: "10.0.0.6" });
    const res = await POST(req);

    expect(res.status).toBe(200);
    const setCookie = res.headers.get("set-cookie");
    expect(setCookie).toContain("qcs_poll_voted=1");
  });

  it("falls back to the secondary configured client when the preferred insert fails", async () => {
    mockInsert.mockResolvedValue({ error: { message: "wrong project" } });
    mockInsertFallback.mockResolvedValue({ error: null });

    const req = makeRequest({ method: "POST", body: { artist_name: "Elena Rose" }, ip: "10.0.0.7" });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(mockInsertFallback).toHaveBeenCalledWith({ artist_name: "Elena Rose" });
  });
});
