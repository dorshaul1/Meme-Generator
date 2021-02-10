'use strict'

var gElCanvas = document.querySelector('#meme-canvas')
// console.dir(gElCanvas)
var gCtx = gElCanvas.getContext('2d');

function getCanvas() {
    return gElCanvas
}

// function setCanvas(newCanvas){
//     gElCanvas = newCanvas
// }
// function setCtx(newCtx){
//     gCtx = newCtx
// }

function getCtx() {
    return gCtx
}

function resizeCanvas(elContainer) {
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function drawImg(currImage) {
    // console.dir( currImage)
    // var image = 'img/2.jpg'
    // console.log('image:', image)
    // console.log('gCtx:', gCtx)
    const img = currImage
    img.src = currImage.src;
    currImage.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}
// function drawImg(img) {
//     console.dir( img)
//     // var image = 'img/2.jpg'
//     // console.log('image:', image)
//     // console.log('gCtx:', gCtx)
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
// }

function drawText(text,fill,border, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = border
    gCtx.fillStyle = fill
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}