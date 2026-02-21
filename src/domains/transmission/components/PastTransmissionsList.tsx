import { usePastTransmissions } from "@/domains/transmission/hooks/usePastTransmissions";

export default function PastTransmissionsList() {
  const { data, isLoading } = usePastTransmissions();

  if (isLoading) return null;

  return (
    <ul>
      {data?.map((t) => (
        <li key={t._id} className="flex gap-2">
          <div>{t.date}</div>
          <div>{t.title}</div>
        </li>
      ))}
    </ul>
  );
}
