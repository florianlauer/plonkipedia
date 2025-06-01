import * as L from "leaflet";
import * as PIXI from "pixi.js";
import { useEffect } from "react";
import useMarker from "../PixiMarkers/hooks/useMarker";
import useMarkerPosition from "../PixiMarkers/hooks/useMarkerPosition";
import useMarkerZoom from "../PixiMarkers/hooks/useMarkerZoom";

type DemoMarkerProps = {
  position: L.LatLng;
  color?: number;
};

const DemoMarker = ({ position, color = 0xffff00 }: DemoMarkerProps) => {
  const { marker, redraw } = useMarker();

  useMarkerZoom(marker);
  useMarkerPosition(marker, position);

  useEffect(() => {
    const shape = new PIXI.Graphics();

    shape.beginFill(color, 0.8);
    shape.drawCircle(0, 0, 3);
    shape.endFill();

    marker.addChild(shape);
    redraw();
    return () => {
      marker.removeChild(shape);
      redraw();
    };
  }, [marker, redraw, color]);

  return null;
};

export default DemoMarker;
