'use strict'

function initCanvas() {
    getCanvas()
    getCtx()
    // addListeners()
    renderCanvas()
    // onResizeCanvas()
}

function imgChoosen(CurrImg){
    onChooseImg(CurrImg)
}

function addListeners() {
    window.addEventListener('resize', () => {
        onResizeCanvas()
        renderCanvas()
    })
}

function onResizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    resizeCanvas(elContainer)
    // renderCanvas()
}

function renderCanvas() {
    var ctx = getCtx()
    ctx.fillStyle = "rgb(255, 235, 235)"
    ctx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onChooseImg(img) {
    drawImg(img)
}
