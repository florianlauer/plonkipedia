import * as L from "leaflet";
import React, { useMemo, useRef } from "react";
import usePixiOverlay from "./hooks/usePixiOverlay";
import {
  PixiLayerContext,
  PixiLayerContextValues,
} from "./utils/pixi-layer-context";
import "leaflet-pixi-overlay";
import "./utils/pixi-setup";

type PixiLayerProps = {
  children?: React.ReactNode;
  options?: L.PixiOverlayOptions;
  zoomTransform: (zoom: number) => number;
};

const drawCallback = (utils: L.PixiUtils) => {
  const container = utils.getContainer();
  const renderer = utils.getRenderer();

  renderer.render(container);
};

const PixiLayer = (props: PixiLayerProps) => {
  const { children, options, zoomTransform } = props;

  const pixiOverlay = usePixiOverlay(drawCallback, options);

  const frame = useRef<number | undefined>(undefined);

  const values = useMemo<PixiLayerContextValues>(() => {
    const utils = pixiOverlay?.utils;
    const container = utils?.getContainer();

    const redraw = () => {
      if (!frame.current) {
        frame.current = window.requestAnimationFrame(() => {
          pixiOverlay?.redraw({ type: "render" });
          frame.current = undefined;
        });
      }
    };

    return {
      registerMarker: (marker) => {
        container?.addChild(marker);
      },
      unregisterMarker: (marker) => {
        container?.removeChild(marker);
      },
      redraw,
      utils,
      zoomTransform,
    };
  }, [pixiOverlay, frame, zoomTransform]);

  return pixiOverlay ? (
    <PixiLayerContext.Provider value={values}>
      {children}
    </PixiLayerContext.Provider>
  ) : null;
};

export default PixiLayer;
