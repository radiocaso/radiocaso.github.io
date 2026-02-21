import { useFutureTransmissions } from "../hooks/useFutureTransmissions";

export default function FutureTransmissionsList() {
  const { data, isLoading } = useFutureTransmissions();

  if (isLoading) return null;

  return (
    <ul>
      {data?.map((t) => (
        <li key={t._id}>
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
