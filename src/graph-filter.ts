import type { ReturnTypeGetChartData } from "./get-chart-data";
import { initElements } from "./init-elements";

export function updateCheckboxes(
  allColumns: Map<string, string>,
  activeColumns: Set<string>,
  currentGraph: ReturnTypeGetChartData,
  disabledDataColumn?: string,
) {
  const { graphCheckboxsContainer } = initElements();
  graphCheckboxsContainer.innerHTML = "";
  let template = "";
  console.log({ size: activeColumns.size });

  for (const [key, value] of allColumns) {
    const isActiveColumn = activeColumns.has(key);
    template += `
            <input id="${currentGraph.names[key]}" 
                   type="checkbox"
                   class="check-graph 
                   ${isActiveColumn ? "active" : ""}" 
                   ${isActiveColumn ? "checked" : ""}
                   data-column="${key}" 
                   ${activeColumns.size === 1 && isActiveColumn ? "disabled" : ""}
                />
            <label 
                  for="${currentGraph.names[key]}" 
                  style="color:${currentGraph.colors[key]}">
              ${currentGraph.names[key]}
            </label>`;
  }

  graphCheckboxsContainer.insertAdjacentHTML("beforeend", template);
}

export function initCheckboxes(
  allColumns: Map<string, string>,
  activeColumns: Set<string>,
  currentGraph: ReturnTypeGetChartData,
) {}
