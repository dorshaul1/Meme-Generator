'use strict'

var gElCanvas = document.querySelector('#meme-canvas')
var gCtx = gElCanvas.getContext('2d');

function getCanvas(){
    return gElCanvas
}

function getCtx(){
    return gCtx
}

function drawImg(currImage) {
    // console.dir( currImage)
    // var image = 'img/2.jpg'
    // console.log('image:', image)
    // console.log('gCtx:', gCtx)
    const img = currImage
    img.src = currImage.src;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }}
// function drawImg(img) {
//     console.dir( img)
//     // var image = 'img/2.jpg'
//     // console.log('image:', image)
//     // console.log('gCtx:', gCtx)
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
// }

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'red'
    gCtx.fillStyle = 'white'
    gCtx.font = '30px Arial'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function clearCanvas(){
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}
