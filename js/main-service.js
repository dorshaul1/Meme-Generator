'use strict'

var gKeywords = {
    'happy': 12,
    'funny puk': 1
}
var gImgs = [];
var gImgId = 0
var gImgsCount = 19

var gMeme

function getImages() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function createMeme(id = null) {
    var meme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: []
    }
    gMeme = meme
}

function addLine(txt, x = 200, y = gElCanvas.height - 350, ) {
    let newLine = {
        txt,
        fillColor: 'white',
        borderColor: 'black',
        textAlign: 'center',
        fontSize: 40,
        font: 'arial',
        posX: x,
        posY: y,
        isMarked: false
    }
    gMeme.lines.push(newLine)
}

function createImageGallery(url, keywords = null) {
    var gImg = {
        id: gImgId,
        url,
        keywords
    }
    gImgId++
    gImgs.push(gImg)
}

createImagesGallery()

function createImagesGallery() {

    for (var i = 1; i < gImgsCount; i++) {
        var url = `img/${i}.jpg`
        createImageGallery(url)
    }
}

function deleteLine() {
    if (gMeme.lines.length === 0) return
    gMeme.lines.splice([gMeme.selectedLineIdx-1], 1)
    // gMeme.selectedLineIdx = 0
}

function changeFillColor(color) {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx - 1].fillColor = color
}

function changeBorderColor(color) {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx - 1].borderColor = color
}

function textUp() {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx - 1].posY -= 5
}

function textDown() {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx - 1].posY += 5
}

function ChangeFontSize(value) {
    if (gMeme.lines.length === 0) return
    if (value === 'minus')
        gMeme.lines[gMeme.selectedLineIdx - 1].fontSize -= 5
    else if (value === 'plus')
        gMeme.lines[gMeme.selectedLineIdx - 1].fontSize += 5
}

function changeTextAlign(value) {
    if (gMeme.lines.length === 0) return
    if (value === 'left')
        gMeme.lines[gMeme.selectedLineIdx - 1].textAlign = 'left'
    else if (value === 'center')
        gMeme.lines[gMeme.selectedLineIdx - 1].textAlign = 'center'
    else if (value === 'right')
        gMeme.lines[gMeme.selectedLineIdx - 1].textAlign = 'right'
}

function ChangeFont(value){
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx - 1].font = value
}