'use strict'

var gCurrImg
var gLineCount = 0

function onInit() {
    initCanvas()
    renderGalleryImages()
}

function navToGallery() {
    var elGallery = document.querySelector('.gallery-container')
    var elMemeEditor = document.querySelector('.meme-editor-container')
    elGallery.classList.remove('hidden')
    elGallery.classList.remove('hidden-childs')
    elMemeEditor.classList.add('hidden')
    elMemeEditor.classList.add('hidden-childs')
}

function renderGalleryImages() {
    let images = getImages()
    let strHTML = images.map(image => {
        return `<div class="image img${image.id}" onclick="showMemeEditor(${image.id})"><img src=${image.url}></div>`
    })
    document.querySelector('.gallery-container').innerHTML = strHTML.join('')
}

function renderMemeEditor(img){
    let elCanvasContainer = document.querySelector('.meme-img')
    imgChoosen(elCanvasContainer)
    // gCurrImg = elCanvasContainer
    elCanvasContainer.src = img.url
}

function onInputText() {
    var elTextInput = document.querySelector('#text')
    var text = elTextInput.value
    // initCanvas()
    if (gLineCount === 0)drawText(text, 150, 50)
    else if (gLineCount === 1)drawText(text, 150, 350)
    else if (gLineCount === 2)drawText(text, 150, 200)
    gLineCount++
    text = ''
}

function showMemeEditor(id){
    var currImg = findImageById(id)
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.meme-editor-container').classList.remove('hidden')
    document.querySelector('.meme-editor-container').classList.remove('hidden-childs')
    renderMemeEditor(currImg)
}