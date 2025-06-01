import * as PIXI from "pixi.js";

export type RenderSVGFunction = () => string;

const textureCache = new Map<string, PIXI.Texture>();
const promisesCache = new Map<string, Promise<PIXI.Texture>>();

export async function generateSVGTexture(
  renderSvgFunction: RenderSVGFunction,
  cacheKey?: string
): Promise<PIXI.Texture> {
  const cachedTexture = cacheKey ? textureCache.get(cacheKey) : undefined;
  if (cachedTexture) return cachedTexture;

  const cachedPromise = cacheKey ? promisesCache.get(cacheKey) : undefined;
  if (cachedPromise) return cachedPromise;

  const promise = new Promise<PIXI.Texture>((res) => {
    const svg = renderSvgFunction();
    const svgBase64 = svgToBase64Svg(svg);
    PIXI.Texture.fromURL(svgBase64).then((texture) => res(texture));
  });

  if (cacheKey) {
    promisesCache.set(cacheKey, promise);
  }
  const texture = await promise;
  if (cacheKey) {
    textureCache.set(cacheKey, texture);
  }

  return texture;
}

const svgToBase64Svg = (svg: string): string => {
  const decoded = unescape(encodeURIComponent(svg));
  return `data:image/svg+xml;base64,${window.btoa(decoded)}`;
};
