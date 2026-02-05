import { chart } from "./chart";
import { type ReturnTypeGetChartData } from "./get-chart-data";
import { updateCheckboxes } from "./graph-filter";
import { initElements } from "./init-elements";
import { loadData } from "./load-data";

async function main() {
  const {
    nextChartBtn,
    prevChartBtn,
    currentGraphEl,
    graphCheckboxsContainer,
    copyMailBtn,
    toast,
  } = initElements();
  let chartIndex = 0;
  const data: ReturnTypeGetChartData[] = loadData();
  currentGraphEl.textContent = `${chartIndex + 1} / ${data.length}`;
  let currentGraph = data[0];
  const allColumns = new Map<string, string>(
    Object.entries(currentGraph.colors),
  );
  const activeColumns = new Set<string>();
  for (const [key, _] of allColumns) {
    activeColumns.add(key);
  }
  let tgChartSwitch = chart(currentGraph, [...activeColumns]);
  updateCheckboxes(allColumns, activeColumns, currentGraph);
  tgChartSwitch?.init();
  // graphFilter(currentGraph, chart);

  nextChartBtn.addEventListener("click", () => {
    tgChartSwitch.destroy();
    if (chartIndex >= data.length - 1) {
      chartIndex = 0;
    } else {
      chartIndex += 1;
    }
    currentGraph = data[chartIndex];

    calcActiveCheckboxes();
    updateCheckboxes(allColumns, activeColumns, currentGraph);
    currentGraphEl.textContent = `${chartIndex + 1} / ${data.length}`;
    tgChartSwitch = chart(currentGraph, [...activeColumns]);
  });
  prevChartBtn.addEventListener("click", () => {
    tgChartSwitch.destroy();
    if (chartIndex <= 0) {
      chartIndex = data.length - 1;
    } else {
      chartIndex -= 1;
    }
    currentGraph = data[chartIndex];

    calcActiveCheckboxes();
    console.log({ activeColumns });
    updateCheckboxes(allColumns, activeColumns, currentGraph);
    currentGraphEl.textContent = `${chartIndex + 1} / ${data.length}`;
    tgChartSwitch = chart(currentGraph, [...activeColumns]);
  });

  graphCheckboxsContainer.addEventListener("change", (e) => {
    tgChartSwitch.destroy();
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) {
      return;
    }
    const dataColumn = el.getAttribute("data-column");
    if (!dataColumn) {
      return;
    }
    const isChecked = el.checked;

    if (isChecked) {
      activeColumns.add(dataColumn);
    } else {
      activeColumns.delete(dataColumn);
    }

    updateCheckboxes(allColumns, activeColumns, currentGraph);

    tgChartSwitch = chart(currentGraph, [...activeColumns]);
  });
  function calcActiveCheckboxes() {
    allColumns.clear();
    activeColumns.clear();
    for (const color of Object.entries(currentGraph.colors)) {
      allColumns.set(color[0], color[1]);
    }

    for (const [key, _] of allColumns) {
      activeColumns.add(key);
    }
  }

  copyMailBtn.addEventListener("click", async () => {
    try {
      // Attempt to write the text to the clipboard
      await navigator.clipboard.writeText("sergeyzadorkin.w@gmail.com");
      toast.classList.add("toast-visible");
      setTimeout(() => {
        toast.classList.remove("toast-visible");
      }, 3000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  });
}

main();
