import type { ScheduleResponse } from "./types";

export async function fetchSchedule(
  apiUrl: string,
): Promise<ScheduleResponse[] | null> {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch schedule data");
  }
  const data: ScheduleResponse[] = await response.json();
  // if (!data?.title) {
  //   return null;
  // }
  return data;
}
