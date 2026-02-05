export function drawGraphCurve(
  ctx: CanvasRenderingContext2D,
  coords: [number, number][],
  { color }: { color: string; translate?: number },
) {
  ctx.beginPath();
  // ctx.save();
  ctx.lineWidth = 4;
  // ctx.translate(translate, 0);
  ctx.strokeStyle = color;
  for (const [x, y] of coords) {
    ctx.lineTo(x, y);
    // ctx.lineTo(x, DPI_HEIGHT - PADDING - y * yRatio);
  }
  ctx.stroke();
  // ctx.restore();
  ctx.closePath();
}
