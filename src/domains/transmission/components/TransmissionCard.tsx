import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Transmission } from "../types";

interface TransmissionCardProps {
  transmission: Transmission;
}
export default function TransmissionCard({
  transmission,
}: TransmissionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{transmission.title}</CardTitle>
        <CardDescription>{transmission.date}</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
        {transmission.info}
      </CardContent>
      <CardFooter>
        {transmission?.transmissionTypes?.map((t) => (
          <Badge key={t.id}>{t.label}</Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
