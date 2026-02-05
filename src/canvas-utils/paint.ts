import { VIEW_HEIGHT, VIEW_WIDTH } from "../constants";
import type { ReturnTypeGetChartData } from "../get-chart-data";
import type { ThemeColors, TProxyTarget } from "../chart";
import { computeXRatio, computeYRatio, toCoords, translateX } from "../utils";
import { clearCanvas } from "./clear-canvas";
import { computeBoundries } from "./compute-boundries";
import { drawGraphCurve } from "./draw-graph-curve";
import { drawGraphPoint } from "./draw-graph-point";
import { isOver } from "./is-over";
import { xAxis } from "./x-axis";
import { yAxis } from "./y-axis";
import type { ToolTipReturnType } from "./tooltip";
import { getMax } from "./get-max";
import { initElements } from "../init-elements";

export function paint(
  data: ReturnTypeGetChartData,
  proxyTarget: TProxyTarget,
  tip: ToolTipReturnType,
  activeColumns: string[],
) {
  const { mainGraphCanvasCtx } = initElements();
  clearCanvas(mainGraphCanvasCtx);

  const dataLength = data.columns[0].length;
  if (proxyTarget.pos) {
    const leftIndex = Math.round((dataLength * proxyTarget.pos[0]) / 100);
    const rightIndex = Math.round((dataLength * proxyTarget.pos[1]) / 100);

    const viewColumns = data.columns.map((col) => {
      const result = col.slice(leftIndex, rightIndex);
      if (typeof result[0] !== "string") {
        result.unshift(col[0]);
      }

      return result;
    });
    console.log(viewColumns);
    const activeViewColumns = viewColumns.filter((col) => {
      const columTitle = col[0];
      return (
        columTitle === "x" ||
        (typeof columTitle === "string" && activeColumns.includes(columTitle))
      );
    });
    const [yMin, yMax] = computeBoundries({
      ...data,
      columns: activeViewColumns,
    });
    const yRatio = computeYRatio(VIEW_HEIGHT, yMax - yMin);
    // const yRatio = VIEW_HEIGHT / (yMax - yMin);

    //[1] length - 2: для того, чтобы первая и последние точки были на границах графика + см.[2]
    const xRatio = computeXRatio(VIEW_WIDTH, activeViewColumns[0].length);
    // const xRatio = VIEW_WIDTH / (columns[0].length - 2);

    // =================================
    // АНИМАЦИЯ
    let prevMax: number = 0; //Дельта по оси Y
    const max = getMax(yMax, prevMax, proxyTarget);
    const translate = translateX(
      data.columns[0].length,
      xRatio,
      proxyTarget.pos[0],
    );
    if (!prevMax) {
      prevMax = max;
      proxyTarget.max = max;
    }

    //  =========================================
    const viewData: ReturnTypeGetChartData = {
      ...data,
      columns: activeViewColumns,
    };
    yAxis(
      mainGraphCanvasCtx,
      yMin,
      yMax,
      proxyTarget.themeColors.lineColor,
      proxyTarget.themeColors.textColor,
    );
    xAxis(mainGraphCanvasCtx, viewData, xRatio, proxyTarget.mouse, tip);
    activeViewColumns.forEach((col) => {
      const columnTitle = col[0];

      // if (data.types[columnTitle] === "x") {
      //   return;
      // }

      const coords = toCoords(col, xRatio, yRatio, yMin);
      drawGraphCurve(mainGraphCanvasCtx, coords, {
        color: data.colors[columnTitle],
        translate,
      });

      for (const [x, y] of coords) {
        if (isOver(proxyTarget.mouse, x, coords.length)) {
          drawGraphPoint(mainGraphCanvasCtx, [x, y]);
        }
      }
    });
  }
}
