'use strict'

var gElCanvas = document.querySelector('#meme-canvas');
var gCtx = gElCanvas.getContext('2d');

function getCanvas(){
    return gElCanvas
}

function getCtx(){
    return gCtx
}

function drawImg(Img) {
    gCtx.drawImage(Img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'red'
    gCtx.fillStyle = 'white'
    gCtx.font = '30px Arial'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}
