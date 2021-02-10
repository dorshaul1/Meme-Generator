'use strict'

function initCanvas() {
    getCanvas()
    getCtx()
    resizeCanvas()
    addListeners()
    renderCanvas()
    onChooseImg()
}

function addListeners() {
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    var elCanvas = getCanvas()
    elCanvas.width = elContainer.offsetWidth
    elCanvas.height = elContainer.offsetHeight
    // renderCanvas()
}

function renderCanvas() {
    var ctx = getCtx()
    ctx.fillStyle = "rgb(255, 235, 235)"
    ctx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onChooseImg() {
    const elImg = document.querySelector('.meme-img')
    drawImg(elImg)
}
