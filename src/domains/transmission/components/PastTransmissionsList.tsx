import { usePastTransmissions } from "@/domains/transmission/hooks/usePastTransmissions";
import formatDate from "@/utils/formatDate";

export default function PastTransmissionsList() {
  const { data, isLoading } = usePastTransmissions();

  if (isLoading) return null;

  return (
    <ul>
      {data?.map((t) => (
        <li key={t._id} className="flex gap-2">
          {t?.date && <div>{formatDate({ date: t.date, short: true })}</div>}
          <div>{t.title}</div>
        </li>
      ))}
    </ul>
  );
}
