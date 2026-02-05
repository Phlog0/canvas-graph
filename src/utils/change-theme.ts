import { paint } from "../canvas-utils";
import type { ToolTipReturnType } from "../canvas-utils/tooltip";
import type { ThemeColors, TProxyTarget } from "../chart";
import type { ReturnTypeGetChartData } from "../get-chart-data";
import { initElements } from "../init-elements";

export function changeTheme(
  data: ReturnTypeGetChartData,
  proxyTarget: TProxyTarget,
  tip: ToolTipReturnType,
) {
  const { mainGraphCanvas } = initElements();

  if (proxyTarget.themeColors.theme === "light") {
    proxyTarget.themeColors = {
      bgColor: "black",
      lineColor: "white",
      textColor: "white",
      theme: "dark",
    };
  } else {
    proxyTarget.themeColors = {
      bgColor: "white",
      lineColor: "gray",
      textColor: "gray",
      theme: "light",
    };
  }
  const html = document.documentElement;
  const theme = html.getAttribute("data-theme");
  if (theme === "dark") {
    html.setAttribute("data-theme", "light");
  } else {
    html.setAttribute("data-theme", "dark");
  }

  mainGraphCanvas.style.backgroundColor = proxyTarget.themeColors.bgColor;
}
