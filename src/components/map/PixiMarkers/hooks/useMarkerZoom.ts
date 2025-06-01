import * as PIXI from "pixi.js";
import { useEffect } from "react";
import { usePixiLayerContext } from "../../pixi/utils/pixi-layer-context";

const useMarkerZoom = (marker: PIXI.Container): void => {
  const { utils, zoomTransform } = usePixiLayerContext();

  // Handle Zoom event
  useEffect(() => {
    if (utils) {
      const map = utils.getMap();

      const updateScale = () => {
        const zoom = utils.getMap().getZoom();
        const transformedZoom = zoomTransform ? zoomTransform(zoom) : zoom;
        const scale = utils.getScale(transformedZoom);
        marker.scale.set(1 / scale);
      };

      updateScale();
      map.on("zoomend", updateScale);
      return () => {
        map.off("zoomend", updateScale);
      };
    }

    return undefined;
  }, [marker, utils, zoomTransform]);
};

export default useMarkerZoom;
