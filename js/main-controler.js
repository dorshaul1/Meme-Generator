'use strict'

var gElCanvas
var gCtx
var gLinesCount = 0
var gImgId = 0
var gTextAlign = ''
var gFontSize = 40

function onInit() {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGalleryImages()
    // enableEnter()
    drawImg()
    clearCanvas()

}

// function enableEnter() {
//     var input = document.getElementById('text');
//     input.addEventListener("keyup", function (event) {
//         if (event.keyCode === 13) {
//             event.preventDefault();
//             document.getElementById('text-btn').click();
//         }
//     });
// }

function onInputText() {
    let elTextInput = document.getElementById('text')
    let text = elTextInput.value
    gLinesCount++

    let fillColor = onChooseFillColor()
    let borderColor = onChooseBorderColor()

    let textAlign = gTextAlign;

    let fontSize = gFontSize

    let font = document.getElementById('impact').value
    console.log('font:', font)

    addLine(text, fillColor, borderColor, textAlign, fontSize, font)
    elTextInput.value = ''
    drawText()
    // drawImg()
    // onInit()
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
    gLinesCount = 0
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

function onChooseFillColor() {
    return document.querySelector('#fill-color').value
}

function onChooseBorderColor() {
    return document.querySelector('#border-color').value
}

function chooseTextAlign(el) {
    if (el.classList.contains('align-left')) gTextAlign = 'left';
    else if (el.classList.contains('align-center')) gTextAlign = 'center';
    else if (el.classList.contains('align-right')) gTextAlign = 'right';
}

function onDeleteLine() {
    deleteLine()
    drawImg()
}

function encreaseFontSize(el) {
    if (el.id === 'minus')
        gFontSize -= 10
    else if (el.id === 'plus')
        gFontSize += 10
    console.log('gFontSize:', gFontSize)
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    // console.log('downloadCanvas -> data', data)
    elLink.href = data
    elLink.download = 'canvas.png'
}

function openSideNav(){
    let elScreen = document.querySelector('.nav-screen')
    let elNav = document.querySelector('.nav-list')
    elScreen.style.display='block'
    elNav.classList.add('openNav')
}

function closeSideNav(){
    let elScreen = document.querySelector('.nav-screen')
    let elNav = document.querySelector('.nav-list')
    elScreen.style.display='none'
    elNav.classList.remove('openNav')

}

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
    if (!meme) return

    var posX = 200
    var posY = gElCanvas.height - 350

    if (gLinesCount === 2) {
        posX = 200
        posY = gElCanvas.height - 20
    } else if (gLinesCount === 3) {
        posX = 200
        posY = gElCanvas.height - 200
    }
        var currLine = meme.lines[gLinesCount-1]

        if (currLine.textAlign === '') currLine.textAlign = 'center'
        if (currLine.fontSize === '') currLine.textAlign = '40'
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = currLine.borderColor;
        gCtx.fillStyle = currLine.fillColor;
        gCtx.font = `${currLine.fontSize}px ${currLine.font}`;
        gCtx.textAlign = currLine.textAlign;
        gCtx.fillText(currLine.txt, posX, posY);
        gCtx.strokeText(currLine.txt, posX, posY);
}
// function drawText() {
//     let meme = getMeme()
//     if (!meme) return

//     var posX = 200
//     var posY = gElCanvas.height - 350

//     if (gLinesCount === 2) {
//         posX = 200
//         posY = gElCanvas.height - 50
//     } else if (gLinesCount === 3) {
//         posX = 200
//         posY = gElCanvas.height - 200
//     }


//     meme.lines.forEach((line) => {

//         if (line.textAlign === '') line.textAlign = 'center'
//         if (line.fontSize === '') line.textAlign = '40'
//         gCtx.lineWidth = 2;
//         gCtx.strokeStyle = line.borderColor;
//         gCtx.fillStyle = line.fillColor;
//         gCtx.font = `${line.fontSize}px Arial`;
//         gCtx.textAlign = line.textAlign;
//         gCtx.fillText(line.txt, posX, posY);
//         gCtx.strokeText(line.txt, posX, posY);

//     });
// }