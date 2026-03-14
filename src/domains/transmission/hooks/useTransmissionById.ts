import { useQuery } from "@tanstack/react-query";
import { fetchTransmissionById } from "../api";

export function useTransmissionById(id: string) {
  return useQuery({
    queryKey: ["transmission", id],
    queryFn: () => fetchTransmissionById(id),
    enabled: !!id,
  });
}
