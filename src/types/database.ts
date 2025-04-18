export type Country = {
  id: number;
  name: string;
  code: string;
  lat: number;
  lng: number;
};

export type Hint = {
  id: number;
  country_id: number;
  image_url: string;
  image_link?: string;
  tags?: string[];
  locations?: string[];
  fulltext?: string;
  country?: Country;
};

export type HintTranslation = {
  id: number;
  hint_id: number;
  lang: string;
  short_text?: string;
  long_text?: string;
  tsvector_fulltext?: string;
};

export type Language = "fr" | "en";

export type Tag = string;
