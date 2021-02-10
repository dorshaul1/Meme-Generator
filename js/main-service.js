'use strict'

var gMemes = []
var gImgId = 1
var gMemeId = 1
var gImgsCount = 19

var gKeywords = {
    'happy': 12,
    'funny puk': 1
}

var gImgs = []

createImagesGallery()

function createImageGallery(url, keywords = null) {
    var gImg = {
        id: gImgId,
        url,
        keywords
    }
    gImgId++
    gImgs.push(gImg)
}

function createImagesGallery() {

    for (var i = 1; i < gImgsCount; i++){
        var url = `img/${i}.jpg`
        createImageGallery(url)
    }
}

function getImages() {
    return gImgs
}

function createMeme() {
    var gMeme = {
        selectedImgId: gMemeId,
        selectedLineIdx: 0,
        lines: [{
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'white',
            borderColor: 'black'
        }]
    }
    gMemeId++
}

function findImageById(id){
    var img = gImgs.find(image =>{
        return image.id === id
    })
    return img
}