const canvas = document.querySelector("#js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".js-color");
const range = document.querySelector("#js-range");
const mode = document.querySelector("#js-mode");
const save = document.querySelector("#js-save");


canvas.height = 700;
canvas.width = 700;
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, 700, 700);
ctx.lineWidth = 2.5;
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = '#2c2c2c';

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

function onTouchMove(evt){
    
     const touches = evt.changedTouches;
     const x = touches[0].clientX
     const y = touches[0].clientY
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

function onTouchDown(e) {
    startPainting();
    console.log('touch');
}

function handleCanvasClick(e){
    if (filling){
        ctx.fillRect(0, 0, 700, 700)
    }
}

function handleClickRight(e){
    e.preventDefault()
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchmove", onTouchMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("touchstart", onTouchDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("touchend", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleClickRight);
}

function handleColorClick(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
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
        ctx.fillStyle = ctx.strokeStyle;
    } else {
        filling = false;
        mode.textContent = "Заливка";
    }
}

if (mode) {
    mode.addEventListener("click", handleMode);
}

function saveJpg(e){
    const img = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = img
    link.download = 'PaintJs [Export]';
    link.click()
}

if(save){
    save.addEventListener('click', saveJpg)
}
