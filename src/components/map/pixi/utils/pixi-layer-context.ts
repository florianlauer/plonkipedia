import * as L from "leaflet";
import * as PIXI from "pixi.js";
import { createContext, useContext } from "react";

export type PixiLayerContextValues = {
  registerMarker: (marker: PIXI.Container) => void;
  unregisterMarker: (marker: PIXI.Container) => void;
  utils?: L.PixiUtils;
  redraw: () => void;
  zoomTransform?: (zoom: number) => number;
};

const DEFAULT_VALUES: PixiLayerContextValues = {
  registerMarker: () => {},
  unregisterMarker: () => {},
  redraw: () => {},
};

export const PixiLayerContext =
  createContext<PixiLayerContextValues>(DEFAULT_VALUES);

export const usePixiLayerContext = () => useContext(PixiLayerContext);
