const canvas = document.querySelector("#js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".js-color");
const range = document.querySelector("#js-range");
const mode = document.querySelector("#js-mode");

canvas.height = 700;
canvas.width = 700;
ctx.lineWidth = 2.5;
ctx.strokeStyle = "#2c2c2c";

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(e) {
    startPainting();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

function handleColorClick(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

Array.from(colors).forEach((color) =>
    color.addEventListener("click", handleColorClick)
);

function hadleRangeChenge(e) {
    const value = e.target.value;
    ctx.lineWidth = value;
}

if (range) {
    range.addEventListener("input", hadleRangeChenge);
}

function handleMode(e) {
    if (!filling) {
        filling = true;
        mode.textContent = "Рисование";
    } else {
        filling = false;
        mode.textContent = "Заливка";
    }
}

if (mode) {
    mode.addEventListener("click", handleMode);
}
