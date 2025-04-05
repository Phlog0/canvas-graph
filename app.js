// 55:23
const WIDTH = 600;
const HEIGHT = 200;
// * Для более плавной графики.
// * для координат (data) размерность canvas: 1200 x 400, а сам элемент 600 х 200
const DPI_WIDTH = WIDTH * 2;
const DPI_HEIGHT = HEIGHT * 2;

const ROWS_COUNT = 5;
const PADDING = 40;

const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2


function chart(canvas, data) {
    const ctx = canvas.getContext('2d')
    canvas.style.width = WIDTH + 'px'
    canvas.style.height = HEIGHT + 'px'
    //! разные вещи
    canvas.width = DPI_WIDTH
    canvas.height = DPI_HEIGHT

    const [yMin, yMax] = computeBoundries(data)
    const yRatio = VIEW_HEIGHT / (yMax - yMin)
    // *========================
    // *y axis (сторчки - горизонтальные линии)

    const step = VIEW_HEIGHT / ROWS_COUNT
    const stepText = (yMax - yMin) / ROWS_COUNT;
    ctx.beginPath();
    ctx.strokeStyle = '#bbb'
    ctx.font = 'normal 20px Helvetica,sans-serif'
    ctx.fillStyle = "#96a2aa"
    for (let i = 1; i <= ROWS_COUNT; i++) {

        const y = step * i;
        const text = yMax - stepText * i;
        ctx.fillText(text.toString(), 5, y - 10 + PADDING)
        ctx.moveTo(0, y + PADDING);
        ctx.lineTo(DPI_WIDTH, y + PADDING)
        ctx.stroke();
    }
    ctx.closePath();
    // *========================


    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ff0000'
    for (const [x, y] of data) {
        ctx.lineTo(x, DPI_HEIGHT - PADDING - y * yRatio)
        ctx.stroke();
    }
    ctx.closePath();

}


chart(document.getElementById('chart'), [
    [0, 0],
    [200, 200],
    [200, 1000],
    [400, 100],
])


function computeBoundries(data) {
    let min;
    let max
    for (const [, y] of data) {
        if (typeof min !== 'number') min = y;
        if (typeof max !== 'number') max = y;

        if (min > y) min = y;
        if (max < y) max = y;

    }

    return [min, max]
}