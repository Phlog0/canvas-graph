import { DPI_WIDTH } from "../constants";
import type { TProxyTarget } from "../chart";

//

/**
 * Рисуем ближайшую точку (не точно по пикселям курсора, а по условию в return).
 * Между двумя координатами X есть как бы "столбец" (width). Условие: если разность (расстояние) между курсором и некоторой меткой X меньше половины длины столбца, то значит, курсор очень близко к этой метке расположен (true). Её и визуализируем
 * @param mouse - объект с координатой X курсора
 * @param {number} x - метка на горизонтальной оси
 * @param {number} itemsLength - общее количество элементов
 * @returns {boolean}
 */
export function isOver(
  mouse: TProxyTarget["mouse"],
  x: number,
  itemsLength: number
): boolean {
  if (!mouse.x || mouse.x === undefined) {
    return false;
  }
  const width = DPI_WIDTH / itemsLength;

  // * 01:33:13

  return Math.abs(x - mouse.x) < width / 2;
}
