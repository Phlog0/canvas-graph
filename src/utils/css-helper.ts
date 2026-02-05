export function cssHelper(
  el: HTMLElement,
  styles: Partial<CSSStyleDeclaration> = {}
) {
  Object.assign(el.style, styles);
}
