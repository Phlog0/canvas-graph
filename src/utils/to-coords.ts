import { DPI_HEIGHT, PADDING } from "../constants";

/**
 *
 * @param {(string | number)[]} col колонка (массив, состоящий из заголовка и чисел)
 * @param {number} xRatio коэффциент по горизонтали
 * @param {number} yRatio коэффциент по вертикали
 * @returns {[number, number][]} массив пар чисел ([ [x1, y1], [x2, y2]... ])
 */
export const toCoords = (
  col: (string | number)[],
  xRatio: number,
  yRatio: number,
  yMin: number,
  padding = PADDING,
) => {
  const coords: [number, number][] = [];
  for (let i = 1; i < col.length; i++) {
    const columnValue = col[i];
    if (typeof columnValue !== "number") {
      continue;
    }
    coords.push([
      // * [2] i - 1: i - всего лишь индекс. Нам нужно график начинать с начала (нуля)
      Math.floor((i - 1) * xRatio),
      Math.floor(DPI_HEIGHT - padding - (columnValue - yMin) * yRatio),
      // Math.floor(DPI_HEIGHT - padding - (columnValue - yMin) / yRatio),
    ]);
  }
  return coords;
};
