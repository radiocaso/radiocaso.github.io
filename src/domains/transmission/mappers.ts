import type { TransmissionByIdQueryResult } from "@/lib/sanity/types";
import type { Transmission } from "./types";

export function mapTransmission(
  raw: TransmissionByIdQueryResult,
): Transmission {
  if (!raw?._id || !raw?.fecha || !raw?.slug?.current) {
    throw new Error("Transmission missing vital data");
  }

  return {
    id: raw._id,
    title: raw.titulo ?? "Sin Título",
    slug: raw.slug.current,
    date: new Date(raw.fecha),
    audioUrl: raw.audio?.url ?? null,
    info: raw.descripcionCorta,
    tags: raw.tags
      ? raw.tags
          .filter((t) => t._id && t.tag)
          .map((t) => ({
            id: t._id,
            label: t.tag as string,
          }))
      : null,
    transmissionTypes: raw.tipoDeTransmision
      ? raw.tipoDeTransmision
          .filter((t) => t._id && t.tipoDeTransmision)
          .map((t) => ({
            id: t._id,
            label: t.tipoDeTransmision as string,
          }))
      : null,
  };
}
