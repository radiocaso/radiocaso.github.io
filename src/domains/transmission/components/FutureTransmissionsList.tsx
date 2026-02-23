import { useFutureTransmissions } from "../hooks/useFutureTransmissions";
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
            <div className="text-xs opacity-60" key={tt._id}>
              {tt.label}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
