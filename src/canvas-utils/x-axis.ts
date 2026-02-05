import { DPI_HEIGHT } from "../constants";
import type { TProxyTarget } from "../chart";
import { toDate } from "../utils";
import { drawVerticalLine } from "./draw-vertical-line";
import { isOver } from "./is-over";
import type { ToolTipReturnType } from "./tooltip";
import type { ReturnTypeGetChartData } from "../get-chart-data";

export function xAxis(
  ctx: CanvasRenderingContext2D,
  data: ReturnTypeGetChartData,
  xRatio: number,
  mouse: TProxyTarget["mouse"],
  tip: ToolTipReturnType,
) {
  const yData = data.columns.filter((col) => {
    const columTitle = col[0];

    return data.types[columTitle] === "line";
  });
  const xData = data.columns.filter((col) => {
    const columTitle = col[0];

    return data.types[columTitle] === "x";
  })[0];
  const defaultLabelCount = 6;
  const step = Math.round(xData.length / defaultLabelCount);
  ctx.beginPath();
  for (let i = 1; i < xData.length; i += step) {
    const text = toDate(xData[i]);
    const x = i * xRatio;
    ctx.fillText(text, x, DPI_HEIGHT - 10);
  }
  ctx.closePath();
  for (let i = 1; i < xData.length; i++) {
    const x = i * xRatio;
    if (isOver(mouse, x, xData.length)) {
      drawVerticalLine(ctx, x);
      if (mouse.tooltip?.left && mouse.tooltip?.top) {
        tip.show(mouse.tooltip.left, mouse.tooltip.top, {
          title: toDate(xData[i]),
          items: yData.map((col) => {
            const colTitle = col[0];

            // i +1 потому что первый элемент не берётся в расчёт (:? 02:35:25)
            const value = col[i + 1];
            if (typeof value !== "number") {
              throw new Error("Нечисловое значение в построении осей");
            }
            return {
              color: data.colors[colTitle],
              name: data.names[colTitle],

              value: value,
            };
          }),
        });
      }
      break; // Только одна линия
    }
  }
}
