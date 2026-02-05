import { DPI_HEIGHT, PADDING } from "../constants";

//
export function drawVerticalLine(ctx: CanvasRenderingContext2D, x: number) {
  ctx.beginPath(); // Новый путь для линии
  ctx.moveTo(x, PADDING);
  ctx.lineTo(x, DPI_HEIGHT - PADDING / 2);
  ctx.strokeStyle = "black"; // Пример стиля
  ctx.lineWidth = 2;
  ctx.stroke(); // Рисуем только эту линию
  ctx.closePath();
}
