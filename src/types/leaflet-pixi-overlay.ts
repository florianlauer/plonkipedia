import * as L from "leaflet";
import PIXI from "pixi.js";

declare module "leaflet" {
  interface PixiOverlay extends L.Layer {
    utils: PixiUtils;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    redraw: (data: any) => void;
  }

  interface PixiProjectionZoom {
    (map: L.Map): number;
  }

  interface PixiShouldRedrawOnMove {
    (): boolean;
  }
  interface PixiOverlayOptions extends L.LayerOptions {
    padding?: number;
    forceCanvas?: boolean;
    doubleBuffering?: boolean;
    resolution?: number;
    projectionZoom?: PixiProjectionZoom;
    destroyInteractionManager?: boolean;
    autoPreventDefault?: boolean;
    preserveDrawingBuffer?: boolean;
    clearBeforeRender?: boolean;
    shouldRedrawOnMove?: PixiShouldRedrawOnMove;
  }

  interface PixiUtils {
    latLngToLayerPoint(latLng: L.LatLngExpression, zoom?: number): L.Point;
    layerPointToLatLng(point: L.Point, zoom?: number): L.LatLng;
    getScale(zoom?: number): number;
    getRenderer(): PIXI.Renderer;
    getContainer(): PIXI.Container;
    getMap(): L.Map;
  }

  function pixiOverlay(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    drawCallback: (utils: PixiUtils, event: L.LeafletEvent | any) => void,
    pixiContainer: PIXI.Container,
    options?: PixiOverlayOptions
  ): PixiOverlay;
}
