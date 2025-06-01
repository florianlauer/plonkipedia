import * as PIXI from "pixi.js";

if (typeof window !== "undefined") {
  // Disable Pixi hello message in console
  // Improve Pixi render
  // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

  // @ts-expect-error: leaflet-pixi-overlay needs PIXI on window
  window.PIXI = PIXI;
}
