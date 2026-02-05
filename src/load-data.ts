import jsonData from "./data.json" assert { type: "json" };
import type { ReturnTypeGetChartData } from "./get-chart-data";

export function loadData(): ReturnTypeGetChartData[] {
  return jsonData as ReturnTypeGetChartData[];
}
