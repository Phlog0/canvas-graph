export function translateX(length: number, xRatio: number, left: number) {
  return -1 * Math.round((left * length * xRatio) / 100);
}
