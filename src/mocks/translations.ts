import type { HintTranslation } from "../types/database";

/**
 * Mocks de traductions pour les astuces
 * Utilisé lorsque la table hint_translations est vide
 */
export const mockTranslations: HintTranslation[] = [
  // Traductions anglaises (simulées)
  {
    id: 1001,
    hint_id: 1,
    lang: "en",
    short_text: "Look for red and white signs",
    long_text:
      "In this country, most road signs have distinctive red and white color scheme which can help identify the location quickly.",
  },
  {
    id: 1002,
    hint_id: 2,
    lang: "en",
    short_text: "Yellow license plates with blue stripe",
    long_text:
      "Cars typically have yellow license plates with a blue stripe on the left edge, which is a distinctive feature of this region.",
  },
  {
    id: 1003,
    hint_id: 3,
    lang: "en",
    short_text: "Distinctive church architecture",
    long_text:
      "Churches often have unique onion-shaped domes with gold or silver color, making them easily identifiable landmarks.",
  },
  {
    id: 1004,
    hint_id: 4,
    lang: "en",
    short_text: "Traffic drives on the left side",
    long_text:
      "Unlike most European countries, vehicles drive on the left side of the road here, which is a key geographical clue.",
  },
  {
    id: 1005,
    hint_id: 5,
    lang: "en",
    short_text: "Look for eucalyptus trees and dry landscapes",
    long_text:
      "The presence of eucalyptus trees and reddish soil in rural areas is characteristic of this region's dry climate.",
  },
  {
    id: 1006,
    hint_id: 6,
    lang: "en",
    short_text: "Black and yellow bollards on roadsides",
    long_text:
      "This country uses distinctive black and yellow striped bollards on road edges, especially near curves and dangerous sections.",
  },
  {
    id: 1007,
    hint_id: 7,
    lang: "en",
    short_text: "Angular script on street signs",
    long_text:
      "The local language uses a unique angular script that looks quite distinct from Latin or Cyrillic alphabets on street signs and billboards.",
  },
  {
    id: 1008,
    hint_id: 8,
    lang: "en",
    short_text: "Green-topped telephone booths",
    long_text:
      "Unlike the red telephone booths of the UK, this country has green-topped telephone booths which are easily spotted in urban areas.",
  },
  {
    id: 1009,
    hint_id: 9,
    lang: "en",
    short_text: "Blue-painted houses with white trim",
    long_text:
      "Many coastal villages feature distinctive blue houses with white trim, a traditional color scheme that helps reduce heat absorption.",
  },
  {
    id: 1010,
    hint_id: 10,
    lang: "en",
    short_text: "Presidential guard in traditional uniform",
    long_text:
      "The capital city features guards in distinctive red and gold uniforms with pom-pom shoes, a unique sight that immediately identifies the country.",
  },

  // Traductions françaises (simulées)
  {
    id: 2001,
    hint_id: 1,
    lang: "fr",
    short_text: "Cherchez les panneaux rouges et blancs",
    long_text:
      "Dans ce pays, la plupart des panneaux routiers ont un schéma de couleur rouge et blanc distinctif qui peut aider à identifier rapidement l'emplacement.",
  },
  {
    id: 2002,
    hint_id: 2,
    lang: "fr",
    short_text: "Plaques d'immatriculation jaunes avec bande bleue",
    long_text:
      "Les voitures ont généralement des plaques d'immatriculation jaunes avec une bande bleue sur le bord gauche, ce qui est une caractéristique distinctive de cette région.",
  },
  {
    id: 2003,
    hint_id: 3,
    lang: "fr",
    short_text: "Architecture d'église distinctive",
    long_text:
      "Les églises ont souvent des dômes uniques en forme d'oignon de couleur or ou argent, ce qui en fait des points de repère facilement identifiables.",
  },
  {
    id: 2004,
    hint_id: 4,
    lang: "fr",
    short_text: "Circulation à gauche",
    long_text:
      "Contrairement à la plupart des pays européens, les véhicules roulent ici du côté gauche de la route, ce qui constitue un indice géographique clé.",
  },
  {
    id: 2005,
    hint_id: 5,
    lang: "fr",
    short_text: "Recherchez les eucalyptus et les paysages secs",
    long_text:
      "La présence d'eucalyptus et de sol rougeâtre dans les zones rurales est caractéristique du climat sec de cette région.",
  },
  {
    id: 2006,
    hint_id: 6,
    lang: "fr",
    short_text: "Bornes noir et jaune sur les bords de route",
    long_text:
      "Ce pays utilise des bornes distinctives à rayures noires et jaunes sur les bords des routes, particulièrement près des virages et des sections dangereuses.",
  },
  {
    id: 2007,
    hint_id: 7,
    lang: "fr",
    short_text: "Écriture angulaire sur les panneaux de rue",
    long_text:
      "La langue locale utilise une écriture angulaire unique qui se distingue nettement des alphabets latins ou cyrilliques sur les panneaux de rue et les panneaux publicitaires.",
  },
  {
    id: 2008,
    hint_id: 8,
    lang: "fr",
    short_text: "Cabines téléphoniques à toit vert",
    long_text:
      "Contrairement aux cabines téléphoniques rouges du Royaume-Uni, ce pays possède des cabines téléphoniques à toit vert facilement repérables dans les zones urbaines.",
  },
  {
    id: 2009,
    hint_id: 9,
    lang: "fr",
    short_text: "Maisons peintes en bleu avec bordures blanches",
    long_text:
      "De nombreux villages côtiers présentent des maisons bleues distinctives avec des bordures blanches, un schéma de couleur traditionnel qui aide à réduire l'absorption de chaleur.",
  },
  {
    id: 2010,
    hint_id: 10,
    lang: "fr",
    short_text: "Garde présidentielle en uniforme traditionnel",
    long_text:
      "La capitale présente des gardes en uniformes distinctifs rouges et or avec des chaussures à pompons, une vue unique qui identifie immédiatement le pays.",
  },
  // Traductions anglaises supplémentaires
  {
    id: 1011,
    hint_id: 11,
    lang: "en",
    short_text: "Distinctive yellow fire hydrants",
    long_text:
      "Unlike many countries with red fire hydrants, this nation uses bright yellow fire hydrants that are easily spotted along the streets.",
  },
  {
    id: 1012,
    hint_id: 12,
    lang: "en",
    short_text: "White crosses on mountain peaks",
    long_text:
      "Many mountain summits in this region are marked with distinctive white crosses, a tradition dating back several centuries.",
  },
  {
    id: 1013,
    hint_id: 13,
    lang: "en",
    short_text: "Unique triple-stripe flag on buildings",
    long_text:
      "Government buildings often display the national flag featuring three equal horizontal stripes in a unique color combination not found elsewhere.",
  },
  {
    id: 1014,
    hint_id: 14,
    lang: "en",
    short_text: "Distinctive concrete bus shelters",
    long_text:
      "Rural areas feature unique Soviet-era concrete bus shelters with decorative patterns that are iconic to this region.",
  },
  {
    id: 1015,
    hint_id: 15,
    lang: "en",
    short_text: "Palm trees with distinctive red fruit",
    long_text:
      "The landscape features a specific type of palm tree that bears bright red fruit clusters, indigenous to this tropical region.",
  },
  // Traductions françaises supplémentaires
  {
    id: 2011,
    hint_id: 11,
    lang: "fr",
    short_text: "Bornes d'incendie jaunes distinctives",
    long_text:
      "Contrairement à de nombreux pays avec des bornes d'incendie rouges, cette nation utilise des bornes d'incendie jaune vif facilement repérables le long des rues.",
  },
  {
    id: 2012,
    hint_id: 12,
    lang: "fr",
    short_text: "Croix blanches sur les sommets des montagnes",
    long_text:
      "De nombreux sommets montagneux de cette région sont marqués par des croix blanches distinctives, une tradition remontant à plusieurs siècles.",
  },
  {
    id: 2013,
    hint_id: 13,
    lang: "fr",
    short_text: "Drapeau unique à trois bandes sur les bâtiments",
    long_text:
      "Les bâtiments gouvernementaux affichent souvent le drapeau national comportant trois bandes horizontales égales dans une combinaison de couleurs unique introuvable ailleurs.",
  },
  {
    id: 2014,
    hint_id: 14,
    lang: "fr",
    short_text: "Abribus en béton distinctifs",
    long_text:
      "Les zones rurales présentent des abribus uniques de l'ère soviétique en béton avec des motifs décoratifs emblématiques de cette région.",
  },
  {
    id: 2015,
    hint_id: 15,
    lang: "fr",
    short_text: "Palmiers avec fruits rouges distinctifs",
    long_text:
      "Le paysage présente un type spécifique de palmier qui porte des grappes de fruits rouge vif, indigènes à cette région tropicale.",
  },
];

/**
 * Récupère une traduction mockée basée sur l'ID de l'astuce et la langue
 */
export const getMockTranslation = (
  hintId: number,
  language: string
): HintTranslation | null => {
  return (
    mockTranslations.find((t) => t.hint_id === hintId && t.lang === language) ||
    null
  );
};
