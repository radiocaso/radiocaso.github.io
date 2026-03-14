import { useQuery } from "@tanstack/react-query";
import { fetchSchedule } from "./scheduleQuery";
import { useSiteSettings } from "@/domains/site/hooks/useSiteSettings";

export function useSchedule() {
  const { data: site } = useSiteSettings();
  const apiUrl = site?.schedule;

  return useQuery({
    queryKey: ["schedule", apiUrl],
    enabled: typeof apiUrl === "string",
    queryFn: () => fetchSchedule(apiUrl as string),
  });
}
