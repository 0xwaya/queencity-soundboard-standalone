export const POLL_ARTISTS = [
  "Rudy La Escala",
  "Elena Rose",
  "José Feliciano",
  "Servando y Florentino",
] as const;

export type PollArtist = (typeof POLL_ARTISTS)[number];
