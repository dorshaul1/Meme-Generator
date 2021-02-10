'use strict'

function initCanvas() {
    getCanvas()
    getCtx()
    // resizeCanvas()
    addListeners()
    renderCanvas()
}

function imgChoosen(CurrImg){
    onChooseImg(CurrImg)
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

function onChooseImg(img) {
    console.log('img:', img)
    // const elImg = document.querySelector('.meme-img')
    // console.log('elImg:', elImg)
    drawImg(img)
}
