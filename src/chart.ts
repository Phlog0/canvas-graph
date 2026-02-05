import { clearCanvas } from "./canvas-utils/clear-canvas.ts";
import { paint, tooltip } from "./canvas-utils/index.ts";
import { changeTheme } from "./utils/change-theme.ts";
import { DPI_HEIGHT, DPI_WIDTH, HEIGHT, WIDTH } from "./constants.ts";
import { mouseLeave, mouseMove } from "./event-listeners/index.ts";
import type { ReturnTypeGetChartData } from "./get-chart-data.ts";
import { minimapChart } from "./minimap-chart.ts";
import { initElements } from "./init-elements.ts";
export type ThemeColors = {
  theme: "dark" | "light";
  bgColor: "black" | "white";
  textColor: "gray" | "white";
  lineColor: "gray" | "white";
};
export type TProxyTarget = {
  mouse: {
    x?: number;
    tooltip: {
      left?: number;
      top?: number;
    };
  };
  pos?: [number, number];
  max: number;
  themeColors: ThemeColors;
};
const proxyTarget: TProxyTarget = {
  mouse: {
    x: undefined,
    tooltip: {
      left: undefined,
      top: undefined,
    },
  },
  max: 0,
  themeColors: {
    bgColor: "white",
    lineColor: "gray",
    textColor: "gray",
    theme: "light",
  },
};

export function chart(data: ReturnTypeGetChartData, activeColumns: string[]) {
  const {
    mainGraphCanvasCtx,
    minimapChartRoot,
    tooltipElement,
    mainGraphCanvas,
    changeThemeBtn,
  } = initElements();

  // clearCanvas(mainGraphCanvasCtx);

  let rafId: number;

  const minimap = minimapChart(minimapChartRoot, data);

  const tip = tooltip(tooltipElement);
  mainGraphCanvas.style.width = WIDTH + "px";
  mainGraphCanvas.style.height = HEIGHT + "px";
  //! разные вещи
  mainGraphCanvas.width = DPI_WIDTH;
  mainGraphCanvas.height = DPI_HEIGHT;

  const proxy = new Proxy(proxyTarget, {
    set(...args) {
      const result = Reflect.set(...args);

      // !PROXY
      rafId = requestAnimationFrame(() =>
        paint(data, proxyTarget, tip, activeColumns),
      );
      return result;
    },
  });
  function mouseLeaveWrapper() {
    mouseLeave(proxy, tip);
  }
  function mouseMoveWrapper(e: MouseEvent) {
    mouseMove(e, proxy);
  }
  function changeThemeWrapper() {
    changeTheme(data, proxyTarget, tip);
    paint(data, proxyTarget, tip, activeColumns);
  }
  minimap.subscribe((pos: [number, number]) => {
    proxy.pos = pos;
  });
  mainGraphCanvas.addEventListener("mousemove", mouseMoveWrapper);
  mainGraphCanvas.addEventListener("mouseleave", mouseLeaveWrapper);
  changeThemeBtn.addEventListener("click", changeThemeWrapper);

  return {
    init() {
      // PROXY или proxyTarget?
      paint(data, proxy, tip, activeColumns);
      tip.hide();
    },
    destroy() {
      cancelAnimationFrame(rafId);
      rafId = 0;
      mainGraphCanvas.removeEventListener("mousemove", mouseMoveWrapper);
      mainGraphCanvas.removeEventListener("mouseleave", mouseLeaveWrapper);
      cancelAnimationFrame(rafId);
      tip.hide();
      changeThemeBtn.removeEventListener("click", changeThemeWrapper);
      minimap.destroy();

      clearCanvas(mainGraphCanvasCtx);
      // mainGraphCanvas = null;
    },
  };
}
