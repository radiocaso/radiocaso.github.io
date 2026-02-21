import { client } from "@/lib/sanity/client";
import { defineQuery } from "groq";
import type { SiteSettingsQueryResult } from "@/lib/sanity/types";

const siteSettingsQuery = defineQuery(`*[_type == "infoGeneral"][0] {
    "title": titulo,
    "info": descripcion,
    "contact": contacto,
    "socials": redesSociales,
    logo,
    "streamUrl": configuracionDeTransmision,
    "highlighted": destacados[]->{
      _id,
      _type,
      "title": titulo,
      slug,
    },
  }`);

export async function fetchSiteSettings() {
  const data: SiteSettingsQueryResult = await client.fetch(siteSettingsQuery);
  return data;
}
