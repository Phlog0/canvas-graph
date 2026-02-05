type DrawGraphPointOptions = Partial<{
  outlineColor: string;
  fillColor: string;
  pointRadius: number;
}>;
export function drawGraphPoint(
  ctx: CanvasRenderingContext2D,
  coord: [number, number],
  options?: DrawGraphPointOptions
) {
  ctx.beginPath();
  ctx.strokeStyle = options?.outlineColor || "black";

  ctx.fillStyle = options?.fillColor || "white";
  ctx.arc(coord[0], coord[1], options?.pointRadius || 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}
