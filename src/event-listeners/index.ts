import { DPI_RATIO } from "../constants";
import type { TProxyTarget } from "../chart";
import type { ToolTipReturnType } from "../canvas-utils/tooltip";

export function mouseMove(
  { pageX, pageY, currentTarget }: MouseEvent,
  proxy: TProxyTarget,
) {
  // const clientY = event.clientY;

  //Чел сказал что теперь объект реагирует только на изменения X, но это не правда
  const canvas = currentTarget;
  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }
  const { left, top } = canvas.getBoundingClientRect();

  // * правильное позиционирование линии-курсора
  // const LOG = {
  //   clientX,
  //   left,
  //   subtract: clientX - left,
  //   subtractAndDouble: (clientX - left) * DPI_RATIO,
  // };
  // console.log(LOG);
  const viewportWidth = window.innerWidth;

  const canvasX = (pageX - left) * DPI_RATIO;
  let finalLeft = pageX - left + 50;
  let finalTop = pageY - top - 50;
  if (viewportWidth - pageX < left + 160) {
    finalLeft = finalLeft - 160 - 128 / 2;
  }
  // if (viewportHeight - pageY < top + 160) {
  // finalTop -= 100;
  // }
  proxy.mouse = {
    x: canvasX,
    tooltip: {
      left: finalLeft,
      top: finalTop,
    },
  };
}

export function mouseLeave(proxy: TProxyTarget, tip: ToolTipReturnType) {
  proxy.mouse = { ...proxy.mouse, x: undefined };
  tip.hide();
}
