import * as PIXI from "pixi.js";
import { useEffect, useMemo } from "react";
import { usePixiLayerContext } from "../../Pixi/utils/pixi-layer-context";

const useMarker = () => {
  const marker = useMemo(() => new PIXI.Container(), []);

  const { redraw, registerMarker, unregisterMarker } = usePixiLayerContext();

  useEffect(() => {
    registerMarker(marker);
    return () => {
      unregisterMarker(marker);
    };
  }, [marker, registerMarker, unregisterMarker]);

  return { marker, redraw };
};

export default useMarker;
