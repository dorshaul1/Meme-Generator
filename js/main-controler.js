'use strict'

var gElCanvas
var gCtx
var gLinesCount = 0
var gImgId = 0
var gTextAlign = ''

function onInit() {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGalleryImages()
    enableEnter()
    drawImg()
    clearCanvas()
    
}

function enableEnter() {
    var input = document.getElementById('text');
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById('text-btn').click();
        }
    });
}

function onInputText() {
    let elTextInput = document.getElementById('text')
    let text = elTextInput.value
    gLinesCount++

    let fillColor = onChooseFillColor()
    let borderColor = onChooseBorderColor()
    
    var textAlign = gTextAlign;

    addLine(text, fillColor, borderColor, textAlign)
    elTextInput.value = ''
    onInit()
}

function renderGalleryImages() {
    let images = getImages()
    let strHTML = images.map(image => {
        return `<div id=${image.id} class="image img${image.id}" onclick="showMemeEditor(this)"><img src=${image.url}></div>`
    })
    document.querySelector('.gallery-container').innerHTML = strHTML.join('')
}

function choosenImage(el) {
    clearCanvas()
    let imgId = el.id
    gImgId = +imgId
    drawImg()
    // onInit()
}

function showMemeEditor(el) {
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.meme-editor-container').classList.remove('hidden')
    document.querySelector('.meme-editor-container').classList.remove('hidden-childs')
    choosenImage(el)
    createMeme(el.id)
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

// function onDeleteLine(){
//     deleteLine()
// }

//canvas

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function drawImg() {
    let images = getImages()
    const img = new Image
    img.src = images[gImgId].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText()
    }
}

function drawText() {
    let meme = getMeme()
    meme.lines.forEach((line) => {
        if (line.textAlign === '') line.textAlign = 'center'
		gCtx.lineWidth = 2;
		gCtx.strokeStyle = line.borderColor;
		gCtx.fillStyle = line.fillColor;
		gCtx.font = '40px Arial';
		gCtx.textAlign = line.textAlign;
		gCtx.fillText(line.txt, gElCanvas.width/2, gElCanvas.height-350);
		gCtx.strokeText(line.txt, gElCanvas.width/2, gElCanvas.height-350);
	});
}
