import { getPosition } from "./get-position";

export function next(
  nextFn: unknown,
  $left: HTMLDivElement,
  $right: HTMLDivElement,
) {
  if (typeof nextFn === "function") {
    nextFn(getPosition($left, $right));
  }
}
