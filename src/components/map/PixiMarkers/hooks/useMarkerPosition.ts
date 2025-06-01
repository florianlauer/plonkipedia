import * as L from "leaflet";
import * as PIXI from "pixi.js";
import { useEffect } from "react";
import { usePixiLayerContext } from "../../Pixi/utils/pixi-layer-context";

const useMarkerPosition = (
  marker: PIXI.Container,
  position: L.LatLngExpression
): void => {
  const { utils, redraw } = usePixiLayerContext();
  // Marker position
  useEffect(() => {
    if (utils) {
      const markerCoords = utils.latLngToLayerPoint(position);
      marker.x = markerCoords.x;
      marker.y = markerCoords.y;
      redraw();
    }
  }, [position, utils, redraw, marker]);
};

export default useMarkerPosition;
