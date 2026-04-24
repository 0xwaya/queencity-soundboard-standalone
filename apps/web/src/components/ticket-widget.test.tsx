import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TicketWidget from "@/components/ticket-widget";

vi.mock("@vercel/analytics", () => ({
  track: vi.fn(),
}));

describe("TicketWidget", () => {
  it("renders buy button for valid HTTPS event URL", () => {
    render(<TicketWidget eventTitle="Test Concert" eventTicketUrl="https://tickets.example.com/e/123" />);

    expect(screen.getByRole("link", { name: "Buy Tickets" })).toHaveAttribute(
      "href",
      "https://tickets.example.com/e/123",
    );
  });

  it("hides checkout when sales are disabled", () => {
    render(
      <TicketWidget
        eventTitle="Franco De Vita Live"
        eventTicketUrl="https://tickets.example.com/e/123"
        salesDisabled
      />,
    );

    expect(screen.queryByRole("link", { name: "Buy Tickets" })).not.toBeInTheDocument();
    expect(screen.getByText(/Ticket sales are paused/i)).toBeInTheDocument();
  });

  it("does not render checkout for non-HTTPS event URL", () => {
    render(<TicketWidget eventTitle="Test Concert" eventTicketUrl="http://tickets.example.com/e/123" />);

    expect(screen.queryByRole("link", { name: "Buy Tickets" })).not.toBeInTheDocument();
    expect(screen.getByText(/Missing ticket URL/i)).toBeInTheDocument();
  });

  it("tracks checkout clicks", async () => {
    const { track } = await import("@vercel/analytics");

    render(<TicketWidget eventTitle="Tracked Concert" eventTicketUrl="https://tickets.example.com/e/123" />);
    fireEvent.click(screen.getByRole("link", { name: "Buy Tickets" }));

    expect(track).toHaveBeenCalledTimes(1);
  });
});
