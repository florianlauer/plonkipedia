import { useLeafletContext } from "@react-leaflet/core";
import * as L from "leaflet";
import * as PIXI from "pixi.js";
import { useEffect, useMemo, useState } from "react";
import "leaflet-pixi-overlay";

type PixiDrawCallback = (utils: L.PixiUtils, event: L.LeafletEvent) => void;

const DEFAULT_OPTIONS: L.PixiOverlayOptions = { resolution: 2, padding: 1 };

const usePixiOverlay = (
  drawCallback: PixiDrawCallback,
  options?: L.PixiOverlayOptions
) => {
  const container = useMemo(() => new PIXI.Container(), []);

  const context = useLeafletContext();
  const mapContainer = context.layerContainer || context.map;

  const [pixiOverlay, setPixiOverlay] = useState<L.PixiOverlay>();

  useEffect(() => {
    const overlay = L.pixiOverlay(
      drawCallback,
      container,
      options ?? DEFAULT_OPTIONS
    );

    mapContainer.addLayer(overlay);
    setPixiOverlay(overlay);
    return () => {
      mapContainer.removeLayer(overlay);
      setPixiOverlay(undefined);
    };
  }, [drawCallback, container, mapContainer, options]);

  return pixiOverlay;
};

export default usePixiOverlay;
