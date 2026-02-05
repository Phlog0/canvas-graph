import type { ReturnTypeGetChartData } from "../get-chart-data";

export function computeBoundries(data: ReturnTypeGetChartData) {
  let min: number = Infinity;
  let max: number = -Infinity;

  // Максимум и минимум из всех возможных линий
  data.columns.forEach((col) => {
    if (col[0] === "x") return;
    if (typeof col[1] === "number") {
      if (typeof min !== "number") min = col[1];
      if (typeof max !== "number") max = col[1];

      for (let i = 2; i < col.length; i++) {
        const columnValue = col[i];
        if (typeof columnValue === "number") {
          if (min > columnValue) min = columnValue;
          if (max < columnValue) max = columnValue;
        }
      }
    }
  });

  return [min, max];
}
