'use strict'

var gCurrImg
var gLineCount = 0
var gTextAlign = ''
// console.log('gTextAlign:', gTextAlign)

function onInit() {
    initCanvas()
    renderGalleryImages()
    enableEnter()
    gLineCount = 0
}

function navToGallery() {
    var elGallery = document.querySelector('.gallery-container')
    var elMemeEditor = document.querySelector('.meme-editor-container')
    elGallery.classList.remove('hidden')
    elGallery.classList.remove('hidden-childs')
    elMemeEditor.classList.add('hidden')
    elMemeEditor.classList.add('hidden-childs')
    onInit()
}

function renderGalleryImages() {
    let images = getImages()
    let strHTML = images.map(image => {
        return `<div class="image img${image.id}" onclick="showMemeEditor(${image.id})"><img src=${image.url}></div>`
    })
    document.querySelector('.gallery-container').innerHTML = strHTML.join('')
}

function renderMemeEditor(img) {
    let elCanvasContainer = document.querySelector('.meme-img')
    imgChoosen(elCanvasContainer)
    // gCurrImg = elCanvasContainer
    elCanvasContainer.src = img.url
}

function enableEnter(){
    var input = document.getElementById('text');
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          document.getElementById('text-btn').click();
        }
      });
}

function onInputText() {
    let elTextInput = document.querySelector('#text')
    let text = elTextInput.value
    // initCanvas()

    let fillColor = onChooseFillColor()
    let borderColor = onChooseBorderColor()

    var textAlign = gTextAlign;
    // console.log('gTextAlign:', gTextAlign)
    // console.log('textAlign:', textAlign)

    if (gLineCount === 0) drawText(text,fillColor,borderColor,textAlign, 200, 50)
    else if (gLineCount === 1) drawText(text,fillColor,borderColor,textAlign,200, 350)
    else if (gLineCount === 2) drawText(text,fillColor,borderColor,textAlign,200, 200)
    else if (gLineCount === 3) gLineCount = 0
    gLineCount++
    elTextInput.value = ''
}

function onChooseFillColor(){
    return document.querySelector('#fill-color').value
}

function onChooseBorderColor(){
    return document.querySelector('#border-color').value
}

function chooseTextAlign(el){
    if (el.classList.contains('align-left')) gTextAlign = 'left';
    else if (el.classList.contains('align-center')) gTextAlign = 'center';
    else if (el.classList.contains('align-right')) gTextAlign = 'right';
}

function showMemeEditor(id) {
    var currImg = findImageById(id)
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.meme-editor-container').classList.remove('hidden')
    document.querySelector('.meme-editor-container').classList.remove('hidden-childs')
    renderMemeEditor(currImg)
}