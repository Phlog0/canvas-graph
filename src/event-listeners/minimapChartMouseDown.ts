import { WIDTH } from "../constants";
import { initElements } from "../init-elements";
import { next } from "../minimap-utils/next";

import { setPosition } from "../minimap-utils/setPosition";

export function minimapChartMouseDown(
  event: MouseEvent,
  // $left: HTMLDivElement,
  // $minimapWindow: HTMLDivElement,
  // $right: HTMLDivElement,
  nextFn: (values: [number, number]) => void,
) {
  const { minimapCanvas, minimapCanvasCtx, $left, $minimapWindow, $right } =
    initElements();
  const dimensions = {
    left: parseInt($minimapWindow.style.left),
    right: parseInt($minimapWindow.style.right),
    width: parseInt($minimapWindow.style.width),
  };
  if (!(event.target instanceof HTMLElement)) {
    return;
  }
  const type = event?.target?.dataset.type;
  if (type === "window") {
    const startX = event.pageX;

    document.onmousemove = (e) => {
      const delta = startX - e.pageX;
      if (delta === 0) {
        return;
      }

      const left = dimensions.left - delta;
      const right = WIDTH - left - dimensions.width;
      // console.log({
      //   type,
      //   eventPageX: event.pageX,
      //   ePageX: e.pageX,
      //   dimensions,
      //   left,
      //   right,
      // });
      setPosition(left, right, $left, $minimapWindow, $right);
      next(nextFn, $left, $right);
    };
  } else if (type === "left" || type === "right") {
    const startX = event.pageX;
    document.onmousemove = (e) => {
      const delta = startX - e.pageX;

      if (delta === 0) {
        return;
      }
      if (type === "left") {
        const left = WIDTH - (dimensions.width + delta) - dimensions.right;
        // const right = WIDTH - (dimensions.width + delta) - left;

        setPosition(left, dimensions.right, $left, $minimapWindow, $right);
        next(nextFn, $left, $right);
      } else if (type === "right") {
        // формула у меня
        const right = WIDTH - (dimensions.left + dimensions.width) + delta;
        // формула у Владилена
        // const right = WIDTH - (dimensions.width - delta) - dimensions.left;
        setPosition(dimensions.left, right, $left, $minimapWindow, $right);
        next(nextFn, $left, $right);
      }
    };
  }
}
