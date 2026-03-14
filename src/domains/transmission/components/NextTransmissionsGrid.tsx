import TransmissionCard from "./TransmissionCard";
import { useFutureTransmissions } from "../hooks/useFutureTransmissions";

export default function NextTransmissionsGrid() {
  const { data: futureTransmissions } = useFutureTransmissions();
  const nextTransmissions = futureTransmissions;

  if (!nextTransmissions) return null;
  return (
    <>
      {nextTransmissions.map((t) => (
        <TransmissionCard transmission={t} key={t._id} />
      ))}
    </>
  );
}
