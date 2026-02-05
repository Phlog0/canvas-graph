import { DPI_RATIO } from "../constants";
import { cssHelper } from "../utils";
export type TooltipTemplateData = {
  title: string;
  items: { value: number; name: string; color: string }[];
};

export type ToolTipReturnType = {
  show(left: number, top: number, data: TooltipTemplateData): void;
  hide(): void;
};
const template = (data: TooltipTemplateData) => {
  return `
<h2 class="tooltip-list-title">${data.title}
</h2> 
<ul class="tooltip-list">
    ${data.items
      .map((item) => {
        return `
        <li class="tooltip-list-item"> 
          <div class="name" style="color: ${item.color}">${item.name}</div>

          <div class="value" style="color: ${item.color}">${item.value} </div>
        </li>
        `;
      })
      .join("")}
</ul>
`;
};
export function tooltip(el: HTMLDivElement) {
  const clearHTML = () => (el.innerHTML = "");
  return {
    show(left: number, top: number, data: TooltipTemplateData) {
      clearHTML();
      el.insertAdjacentHTML("afterbegin", template(data));
      cssHelper(el, {
        left: left + "px",
        top: top + "px",
        display: "grid",
      });
    },
    hide() {
      cssHelper(el, { display: "none" });
    },
  };
}
