import * as PIXI from "pixi.js";
import { useEffect } from "react";
import { usePixiLayerContext } from "../../Pixi/utils/pixi-layer-context";

const useMarkerClickEvent = <T = unknown>(
  sprite: PIXI.Container,
  id?: T,
  clickHandler?: (id: T) => void
) => {
  const { redraw } = usePixiLayerContext();

  useEffect(() => {
    if (clickHandler && id != null) {
      const handleClick = () => clickHandler(id);
      sprite.interactive = true;
      sprite.cursor = "pointer";
      sprite.on("pointertap", handleClick);
      redraw();
      return () => {
        sprite.interactive = false;
        sprite.cursor = "auto";
        sprite.off("pointertap", handleClick);
        redraw();
      };
    }
    return () => undefined;
  }, [sprite, id, clickHandler, redraw]);
};

export default useMarkerClickEvent;
