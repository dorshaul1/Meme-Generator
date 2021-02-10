'use strict'

var gMemes = []

var gKeywords = {
    'happy': 12,
    'funny puk': 1
}

var gImgs = [{
        id: 1,
        url: 'img/9.jpg',
        keywords: ['happy']
    },
    {
        id: 2,
        url: 'img/5.jpg',
        keywords: ['happy']
    }, 
    {
        id: 3,
        url: 'img/8.jpg',
        keywords: ['happy']
    },

];

var gMemeId = 1

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