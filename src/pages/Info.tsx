import { useSiteSettings } from "@/domains/site/hooks/useSiteSettings";
import { PortableText } from "@portabletext/react";

export default function Info() {
  const { data, isLoading } = useSiteSettings();

  if (isLoading) return null;

  return (
    <section className="max-w-prose">
      {data?.info && <PortableText value={data.info} />}
      {data?.contact && <a href={`mailto:${data.contact}`}>{data.contact}</a>}
    </section>
  );
}
