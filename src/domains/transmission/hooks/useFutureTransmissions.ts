import { useQuery } from "@tanstack/react-query";
import { fetchFutureTransmissions } from "../api";

export function useFutureTransmissions() {
  return useQuery({
    queryKey: ["futureTransmissions"],
    queryFn: fetchFutureTransmissions,
  });
}
