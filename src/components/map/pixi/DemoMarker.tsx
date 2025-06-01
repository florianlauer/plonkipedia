import * as L from "leaflet";
import * as PIXI from "pixi.js";
import { useEffect } from "react";
import useMarker from "../PixiMarkers/hooks/useMarker";
import useMarkerPosition from "../PixiMarkers/hooks/useMarkerPosition";
import useMarkerZoom from "../PixiMarkers/hooks/useMarkerZoom";

type DemoMarkerProps = {
  position: L.LatLng;
};

const DemoMarker = ({ position }: DemoMarkerProps) => {
  const { marker, redraw } = useMarker();

  useMarkerZoom(marker);
  useMarkerPosition(marker, position);

  useEffect(() => {
    const shape = new PIXI.Graphics();

    shape.beginFill(0xffff00, 0.8);
    shape.drawCircle(0, 0, 2);
    shape.endFill();

    marker.addChild(shape);
    redraw();
    return () => {
      marker.removeChild(shape);
      redraw();
    };
  }, [marker, redraw]);

  return null;
};

export default DemoMarker;
