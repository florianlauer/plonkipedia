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
            // Switch markerType ici si besoin
            if (markerType === "demo") {
              return <DemoMarker key={i} position={L.latLng(lat, lng)} />;
            }
            // Ajoute d'autres types de markers Pixi ici
            return null;
          })}
      </PixiLayer>
    );
  }

  // Mode natif Leaflet
  return <GeoJSON data={data} />;
};

export default GeoJSONLayer;
