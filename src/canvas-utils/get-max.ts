import type { TProxyTarget } from "../chart";
import { SPEED } from "../constants";

export function getMax(
  yMax: number,
  prevMax: number,
  proxyTarget: TProxyTarget,
) {
  const step = (yMax - prevMax) / SPEED;
  if (proxyTarget.max < yMax) {
    proxyTarget.max += step;
  } else if (proxyTarget.max > yMax) {
    proxyTarget.max = yMax;
    prevMax = yMax;
  }
  return proxyTarget.max;
}
