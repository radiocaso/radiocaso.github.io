import { useQuery } from "@tanstack/react-query";
import { fetchSiteSettings } from "../api";

export function useSiteSettings() {
  return useQuery({
    queryKey: ["siteSettings"],
    queryFn: fetchSiteSettings,
  });
}
