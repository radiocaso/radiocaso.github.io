import { usePublications } from "../hooks/usePublications";

export default function PublicationsList() {
  const { data, isLoading } = usePublications();

  if (isLoading) return null;

  return (
    <ul>
      {data?.map((p) => (
        <li key={p._id}>{p.title}</li>
      ))}
    </ul>
  );
}
