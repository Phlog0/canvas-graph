import { WIDTH } from "../constants";
import { cssHelper } from "../utils";

export function setPosition(
  left: number,
  right: number,
  $left: HTMLDivElement,
  $minimapWindow: HTMLDivElement,
  $right: HTMLDivElement,
) {
  const minWdith = WIDTH * 0.05;
  const w = WIDTH - right - left;
  // console.log({ w, right, left });
  if (w < minWdith) {
    cssHelper($minimapWindow, {
      width: minWdith + "px",
    });
    return;
  }
  if (left < 0) {
    cssHelper($left, { left: 0 + "px" });
    cssHelper($minimapWindow, { width: w + "px" });
    return;
  }
  if (right < 0) {
    cssHelper($right, { right: 0 + "px" });
    cssHelper($minimapWindow, { width: w + "px" });
    return;
  }
  cssHelper($minimapWindow, {
    width: w + "px",
    left: left + "px",
    right: right + "px",
  });
  cssHelper($right, { width: right + "px" });
  cssHelper($left, { width: left + "px" });
}
