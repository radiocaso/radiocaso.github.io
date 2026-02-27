import { useQuery } from "@tanstack/react-query";
import { fetchNowPlaying } from "./nowPlayingQuery";
import { useSiteSettings } from "@/domains/site/hooks/useSiteSettings";

export function useNowPlaying() {
  const { data: site } = useSiteSettings();
  const apiUrl = site?.nowPlaying;

  return useQuery({
    queryKey: ["now-playing", apiUrl],
    enabled: typeof apiUrl === "string",
    queryFn: () => fetchNowPlaying(apiUrl as string),
    refetchInterval: 15000,
    refetchIntervalInBackground: true,
    staleTime: 10_000,
  });
}
