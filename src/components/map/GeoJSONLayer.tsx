import { useEffect, useState, useMemo } from "react";
import { GeoJSON } from "react-leaflet";
import * as L from "leaflet";
import PixiLayer from "./pixi/PixiLayer";
import DemoMarker from "./pixi/DemoMarker";

interface GeoJSONLayerProps {
  url: string;
  renderMode?: "normal" | "pixi";
  markerType?: "demo"; // extensible pour d'autres markers Pixi
}

// Mapping tag -> couleur (hex)
const TAG_COLOR_MAP: Record<string, number> = {
  White: 0xffffff,
  Black: 0x10101c,
  Grey: 0xa1a1a1,
  Blue: 0x00a2fe,
  Navy: 0x563b9a,
  Red: 0xe94560,
  Antenna: 0xfecd19,
  "No Antenna": 0xbf7b2e,
};
const DEFAULT_COLOR = 0x7950e5;

const GeoJSONLayer = ({
  url,
  renderMode = "normal",
  markerType = "demo",
}: GeoJSONLayerProps) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => setData(json))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [url]);

  const features = useMemo(() => data?.features ?? [], [data]);

  if (isLoading) return null;
  if (hasError || !data) return null;

  if (renderMode === "pixi") {
    return (
      <PixiLayer zoomTransform={(z) => z}>
        {features
          .filter((f: any) => f.geometry.type === "Point")
          .map((f: any, i: number) => {
            const [lng, lat] = f.geometry.coordinates;
            // Récupère le tag principal (premier tag)
            const tags = f.properties?.tags;
            const mainTag =
              Array.isArray(tags) && tags.length > 0 ? tags[0] : undefined;
            const color =
              mainTag && TAG_COLOR_MAP[mainTag]
                ? TAG_COLOR_MAP[mainTag]
                : DEFAULT_COLOR;
            if (markerType === "demo") {
              return (
                <DemoMarker
                  key={i}
                  position={L.latLng(lat, lng)}
                  color={color}
                />
              );
            }
            return null;
          })}
      </PixiLayer>
    );
  }

  // Mode natif Leaflet
  return <GeoJSON data={data} />;
};

export default GeoJSONLayer;
