'use strict'

// var gLinesCount = 0

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

function createMeme(id) {
    var meme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: []
    }
    gMeme = meme
}

function addLine(txt, fillColor, borderColor, textAlign) {
    let newLine = {
        txt,
        fillColor,
        borderColor,
        textAlign
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

// function deleteLine(){

// }