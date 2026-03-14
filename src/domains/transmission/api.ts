import { client } from "@/lib/sanity/client";
import { defineQuery } from "groq";
import { mapTransmission } from "./mappers";
import type {
  FutureTransmissionsQueryResult,
  PastTransmissionsQueryResult,
  TransmissionByIdQueryResult,
} from "@/lib/sanity/types";

const futureTransmissionsQuery =
  // TODO: ...
  // defineQuery(`*[_type == "transmision" && fecha > now()] | order(fecha asc) {
  defineQuery(`*[_type == "transmision"] | order(fecha asc)[0..3] { 
    _id,
    "title": titulo,
    "date": fecha,
    slug,
    "transmissionType": tipoDeTransmision[]->{
      _id,
      "label": tipoDeTransmision
    },
    "program": programa->{
      _id,
      "title": titulo},
    "context": contexto->{
      _id,
      "title": titulo},
    "shortDescription": descripcionCorta,
  }`);

export async function fetchFutureTransmissions() {
  const data: FutureTransmissionsQueryResult = await client.fetch(
    futureTransmissionsQuery,
  );
  return data;
}

const pastTransmissionsQuery =
  //defineQuery(`*[_type == "transmision"] | order(fecha desc) {
  defineQuery(`*[_type == "transmision" && fecha < now()] | order(fecha desc) {
    _id,
    "title": titulo,
    "date": fecha,
    "transmissionType": tipoDeTransmision[]->{
      _id,
      "label": tipoDeTransmision
    },
    "program": programa->{
      _id,
      "title": titulo},
    "context": contexto->{
      _id,
      "title": titulo},
    "shortDescription": descripcionCorta,
    "url": audio{url},
    archiveId,
  }`);

export async function fetchPastTransmissions() {
  const data: PastTransmissionsQueryResult = await client.fetch(
    pastTransmissionsQuery,
  );
  return data;
}

const transmissionByIdQuery =
  defineQuery(`*[_type == "transmision" && _id == $id][0] {
  _id,
  titulo,
  audio{url},
  slug,
  fecha,
  tipoDeTransmision,
  descripcionCorta,
  audio{url},
  tags[]->{_id, tag},
  tipoDeTransmision[]->{_id, tipoDeTransmision},
}`);

export async function fetchTransmissionById(id: string) {
  const raw = await client.fetch<TransmissionByIdQueryResult>(
    transmissionByIdQuery,
    { id },
  );
  if (!raw) {
    throw new Error("Transmission not found");
  }

  return mapTransmission(raw);
}
