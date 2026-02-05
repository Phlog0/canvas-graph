import { WIDTH } from "../constants";

export function getPosition(
  $left: HTMLDivElement,
  $right: HTMLDivElement,
): [number, number] {
  const left = parseInt($left.style.width);
  const right = WIDTH - parseInt($right.style.width);
  return [(left * 100) / WIDTH, (right * 100) / WIDTH];
}
