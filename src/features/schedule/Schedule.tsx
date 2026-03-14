import { useSchedule } from "./useSchedule";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

export default function Schedule() {
  const { data, isLoading, error } = useSchedule();
  if (isLoading) return null;

  const sortedData = data
    ?.map((item) => ({
      ...item,
      startDateObj: new Date(item.start_date),
    }))
    .sort((a, b) => a.startDateObj.getTime() - b.startDateObj.getTime());

  return (
    <div className="grid grid-cols-4 gap-4">
      {sortedData?.map((i) => (
        <Card className="min-h-50" key={i.title + i.start_date}>
          <CardHeader>
            <CardTitle>{i.title}</CardTitle>
            <CardDescription>
              {i.startDateObj.toLocaleString("es")}
            </CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
            {/* {i.info} */}
          </CardContent>
          <CardFooter className="mt-auto">Card Footer</CardFooter>
        </Card>
      ))}
    </div>
  );
}
