export function initElements() {
  const chartElement = document.getElementById("chart");
  if (!(chartElement instanceof HTMLDivElement)) {
    throw Error("Не найден chartElement");
  }
  const mainGraphCanvas = chartElement.querySelector<HTMLCanvasElement>(
    '[data-el="mainGraph"]',
  );
  if (!mainGraphCanvas) {
    throw Error("Не найден canvas!");
  }
  const mainGraphCanvasCtx = mainGraphCanvas.getContext("2d");
  if (!mainGraphCanvasCtx) {
    throw Error("Не найден canvas context!");
  }
  const tooltipElement = chartElement.querySelector<HTMLDivElement>(
    '[data-el="tooltip"]',
  );
  if (!tooltipElement) {
    throw Error("Не найден tooltip!");
  }
  const minimapChartRoot = chartElement.querySelector<HTMLDivElement>(
    "[data-el='minimap']",
  );
  if (!minimapChartRoot) {
    throw Error("Не найден minimap!");
  }
  const minimapCanvas = chartElement.querySelector("[data-el='chartMinimap']");
  if (!(minimapCanvas instanceof HTMLCanvasElement)) {
    throw new Error("Не найден canvas-minimap");
  }
  const minimapCanvasCtx = minimapCanvas.getContext("2d");
  if (!minimapCanvasCtx) {
    throw Error("Не найден canvas-minimap context!");
  }

  const $left = chartElement.querySelector("[data-el='left']");
  if (!$left) {
    throw new Error("отсутствуют элементы карты Left");
  }
  const $right = chartElement.querySelector("[data-el='right']");
  if (!$right) {
    throw new Error("отсутствуют элементы карты Right");
  }
  const $minimapWindow = chartElement.querySelector("[data-el='window']");
  if (!$minimapWindow) {
    throw new Error("отсутствуют элементы карты minimapWindow");
  }
  if (
    !(
      $left instanceof HTMLDivElement &&
      $minimapWindow instanceof HTMLDivElement &&
      $right instanceof HTMLDivElement
    )
  ) {
    throw new Error("нужен элемент, у которого могут быть data-атрибуты");
  }

  const changeThemeBtn = document.querySelector(".changeThemeBtn");
  if (!(changeThemeBtn instanceof HTMLButtonElement)) {
    throw Error("Не найден changeThemeBtn");
  }

  const nextChartBtn = document.getElementById("nextChartBtn");
  if (!(nextChartBtn instanceof HTMLButtonElement)) {
    throw Error("Не найден nextChartBtn");
  }
  const prevChartBtn = document.getElementById("prevChartBtn");
  if (!(prevChartBtn instanceof HTMLButtonElement)) {
    throw Error("Не найден prevChartBtn");
  }

  const currentGraphEl = document.querySelector(".graphIndex");
  if (!(currentGraphEl instanceof HTMLSpanElement)) {
    throw Error("Не найден currentGraphEl");
  }
  const graphCheckboxsContainer = document.querySelector(
    ".graph-checkboxs-container",
  );
  if (!(graphCheckboxsContainer instanceof HTMLDivElement)) {
    throw Error("Не найден graphCheckboxsContainer");
  }
  const copyMailBtn = document.getElementById("copyMailBtn");
  if (!(copyMailBtn instanceof HTMLButtonElement)) {
    throw Error("Не найден copyMailBtn");
  }
  const toast = document.getElementById("toast");
  if (!(toast instanceof HTMLDivElement)) {
    throw Error("Не найден toast");
  }

  return {
    chartElement,
    mainGraphCanvas,
    mainGraphCanvasCtx,
    tooltipElement,
    minimapChartRoot,
    changeThemeBtn,
    nextChartBtn,
    prevChartBtn,
    minimapCanvas,
    minimapCanvasCtx,
    $left,
    $minimapWindow,
    $right,
    currentGraphEl,
    graphCheckboxsContainer,
    copyMailBtn,
    toast,
  };
}
