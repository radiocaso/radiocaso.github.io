import type { NowPlayingResponse } from "./types";

export async function fetchNowPlaying(
  apiUrl: string,
): Promise<NowPlayingResponse | null> {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch now playing data");
  }
  const data: NowPlayingResponse = await response.json();
  if (!data?.title) {
    return null;
  }
  return data;
}
