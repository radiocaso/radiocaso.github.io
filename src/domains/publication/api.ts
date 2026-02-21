import { client } from "@/lib/sanity/client";
import { defineQuery } from "groq";
import type { PublicationsQueryResult } from "@/lib/sanity/types";

const publicationsQuery =
  defineQuery(`*[_type == "publicacion"] | order(fecha desc) { 
      _id,
      "title": titulo,
      slug,
      "date": fecha,
      "publicationType": tipoDePublicacion,
      "description": descripcion,
      "resources": recursos[]->{
        _id,
        "title": titulo,
        url,
        "file": archivo{
          asset->{
            url
          }
        },
      },
      "credits": creditos
    }`);

export async function fetchPublications() {
  const data: PublicationsQueryResult = await client.fetch(publicationsQuery);
  return data;
}
