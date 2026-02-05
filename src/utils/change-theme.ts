import type { TProxyTarget } from "../chart";
import { initElements } from "../init-elements";

export function changeTheme(proxyTarget: TProxyTarget) {
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
