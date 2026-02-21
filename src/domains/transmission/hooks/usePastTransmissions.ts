import { useQuery } from "@tanstack/react-query";
import { fetchPastTransmissions } from "../api";

export function usePastTransmissions() {
  return useQuery({
    queryKey: ["pastTransmissions"],
    queryFn: fetchPastTransmissions,
  });
}
