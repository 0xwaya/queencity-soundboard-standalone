export const POLL_ARTISTS = [
  "Ilegales",
  "Stevie B",
  "Fulanito",
  "Lisette Melendez",
  "Elite Latin throwback DJ",
] as const;

export type PollArtist = (typeof POLL_ARTISTS)[number];

export function isPollArtist(value: string): value is PollArtist {
  return POLL_ARTISTS.includes(value as PollArtist);
}
