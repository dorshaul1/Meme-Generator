'use strict'

function onInit() {
    initCanvas()
    renderGalleryImages()
}

// function navToGallery() {
//     var elGallery = document.querySelector('.gallery-container')
//     // console.log('elGallery:', elGallery)
//     var elMemeEditor = document.querySelector('.meme-editor-container')
//     elGallery.hidden = 'flex'
//     elMemeEditor.style.display = 'none'
// }

function renderGalleryImages() {
    let images = getImages()
    let strHTML = images.map(image => {
        return `<div class="image img${image.id}" onclick="showMemeEditor(${image.id})"><img src=${image.url}></div>`
    })
    document.querySelector('.gallery-container').innerHTML = strHTML.join('')
}

function renderMemeEditor(img){
    let elCanvasContainer = document.querySelector('.canvas-container')
    let strHTML =  `<img src="${img.url}">`
    elCanvasContainer.innerHTML += strHTML
}

function onInputText() {
    var elTextInput = document.querySelector('#text')
    var text = elTextInput.value
    initCanvas()
    drawText(text, 40, 40)
}

function showMemeEditor(id){
    var currImg = findImageById(id)
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.meme-editor-container').classList.remove('hidden')
    document.querySelector('.meme-editor-container').classList.remove('hidden-childs')
    renderMemeEditor(currImg)
}