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
    var images = getImages()
    // console.log('images:', images)
    var strHTML = images.map(image => {
        return `<div class="image img${image.id}"><img src=${image.url}></div>`
    })
    // console.log('strHTML:', strHTML)
    document.querySelector('.gallery-container').innerHTML = strHTML.join('')
}

function onInputText() {
    var elTextInput = document.querySelector('#text')
    var text = elTextInput.value
    initCanvas()
    drawText(text, 40, 40)
}