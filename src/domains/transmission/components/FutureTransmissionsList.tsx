import { useFutureTransmissions } from "../hooks/useFutureTransmissions";
import { Badge } from "@/components/ui/badge";
import formatDate from "@/utils/formatDate";

export default function FutureTransmissionsList() {
  const { data, isLoading } = useFutureTransmissions();

  if (isLoading) return null;

  return (
    <ul>
      {data?.map((t) => (
        <li key={t._id}>
          {t?.date && <div>{formatDate({ date: t.date })}</div>}
          <div>{t.title}</div>
          {t.transmissionType?.map((tt) => (
            <Badge variant="secondary" key={tt._id}>
              {tt.label}
            </Badge>
          ))}
        </li>
      ))}
    </ul>
  );
}
