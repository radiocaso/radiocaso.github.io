import { useQuery } from "@tanstack/react-query";
import { fetchPublications } from "../api";

export function usePublications() {
  return useQuery({
    queryKey: ["publications"],
    queryFn: fetchPublications,
  });
}
