import type { ThemeColors } from "../chart";
import { DPI_WIDTH, PADDING, ROWS_COUNT, VIEW_HEIGHT } from "../constants";

export function yAxis(
  ctx: CanvasRenderingContext2D,
  yMin: number,
  yMax: number,
  lineColor: ThemeColors["lineColor"],
  textColor: ThemeColors["textColor"],
) {
  //Рисует горизонтальные линии
  const step = VIEW_HEIGHT / ROWS_COUNT;
  const stepText = (yMax - yMin) / ROWS_COUNT;
  ctx.beginPath();

  ctx.strokeStyle = lineColor;
  // ctx.strokeStyle = "#bbb";
  ctx.lineWidth = 1;
  ctx.font = "normal 20px JetBrains Mono NL,Helvetica,sans-serif";
  ctx.fillStyle = textColor;
  // ctx.fillStyle = "#96a2aa";
  for (let i = 1; i <= ROWS_COUNT; i++) {
    const y = step * i;
    const text = Math.floor(yMax - stepText * i);
    ctx.fillText(text.toString(), 5, y - 10 + PADDING);

    ctx.moveTo(0, y + PADDING);
    ctx.lineTo(DPI_WIDTH, y + PADDING);
    ctx.stroke();
  }
  ctx.closePath();
}
