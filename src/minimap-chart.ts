import { clearCanvas } from "./canvas-utils/clear-canvas";
import { computeBoundries } from "./canvas-utils/compute-boundries";
import { drawGraphCurve } from "./canvas-utils/draw-graph-curve";
import { DPI_HEIGHT, DPI_WIDTH, HEIGHT, WIDTH } from "./constants";
import type { ReturnTypeGetChartData } from "./get-chart-data";
import { initElements } from "./init-elements";
import {
  minimapChartMouseDown,
  minimapMouseUp,
  setPosition,
} from "./minimap-utils";
import { getPosition } from "./minimap-utils/get-position";
import { computeXRatio, computeYRatio, cssHelper, toCoords } from "./utils";
export function noop(values: [number, number]) {}

export function minimapChart(
  root: HTMLDivElement,
  data: ReturnTypeGetChartData,
) {
  const { minimapCanvas, minimapCanvasCtx, $left, $minimapWindow, $right } =
    initElements();

  clearCanvas(minimapCanvasCtx);
  cssHelper(minimapCanvas, {
    width: DPI_WIDTH / 2 + "px",
    height: HEIGHT / 2 + "px",
  });
  //! разные вещи
  minimapCanvas.width = DPI_WIDTH;
  minimapCanvas.height = DPI_HEIGHT;
  let nextFn = noop;
  function minimapChartMouseDownWrapper(e: MouseEvent) {
    minimapChartMouseDown(e, nextFn);
  }
  root.addEventListener(
    "mousedown",
    minimapChartMouseDownWrapper,
    // minimapChartMouseDown(e, $left, $minimapWindow, $right, nextFn),
  );

  document.addEventListener("mouseup", minimapMouseUp);
  const defaultWidth = WIDTH * 1;
  setPosition(0, WIDTH - defaultWidth, $left, $minimapWindow, $right);

  const [yMin, yMax] = computeBoundries(data);
  // const yRatio = DPI_HEIGHT / (yMax - yMin);
  const yRatio = computeYRatio(DPI_HEIGHT / 2, yMax - yMin);

  // const xRatio = DPI_WIDTH / (data.columns[0].length - 2);
  const xRatio = computeXRatio(DPI_WIDTH, data.columns[0].length);

  data.columns.forEach((col) => {
    const columnTitle = col[0];

    if (data.types[columnTitle] === "x") {
      return;
    }

    // if (columnTitle !)
    const coords = toCoords(col, xRatio, yRatio, -30);
    drawGraphCurve(minimapCanvasCtx, coords, {
      color: data.colors[columnTitle],
    });
  });
  return {
    subscribe(func: (values: [number, number]) => void) {
      nextFn = func;
      func(getPosition($left, $right));
    },
    destroy() {
      root.removeEventListener("mousedown", minimapChartMouseDownWrapper);
      document.removeEventListener("mouseup", minimapMouseUp);
      clearCanvas(minimapCanvasCtx);
    },
  };
}
