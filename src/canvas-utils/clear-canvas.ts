import { DPI_HEIGHT, DPI_WIDTH } from "../constants";

export function clearCanvas(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT);
}
