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
}

function onInputText() {
    let elTextInput = document.getElementById('text')
    let text = elTextInput.value

    let meme = getMeme()
    if (!meme) return
    let currLine = meme.lines[meme.selectedLineIdx - 1]
    // renderCanvas()
    drawImg()
    setTimeout(function () {
        // MarkText()

        elTextInput.value = ''

        currLine.txt = text

        currLine.isMarked = false
        // if (!meme.lines.length) {

        // deleteLine()
        drawText()
        // }
        // renderText()
    }, 2)

}

function onAddLine() {
    let meme = getMeme()
    if (!meme) return
    if (meme.selectedLineIdx === 0) {
        addLine('', gElCanvas.height - 200, gElCanvas.height - 350)
    } else if (meme.selectedLineIdx === 1) {
        addLine('', gElCanvas.height - 200, gElCanvas.height - 20)

    } else meme.selectedLineIdx = 0

    meme.selectedLineIdx++

    setTimeout(function () {

        MarkText()

    }, 2)

    // drawImg()
    drawText()
    // renderText()
    // renderCanvas()
}

function MarkText() {
    let meme = getMeme()
    let currLine = meme.lines[meme.selectedLineIdx - 1]
    MarkTextPosition(currLine.posX - 180, currLine.posY - 45)
}

function MarkTextPosition(x, y) {
    let meme = getMeme()
    let currLine = meme.lines[meme.selectedLineIdx - 1]
    gCtx.beginPath()
    gCtx.rect(x, y, gElCanvas.width - 40, currLine.fontSize + 20)
    gCtx.strokeStyle = 'red'
    gCtx.stroke()
}

function onClickCanvas(ev) {

    // TODO: find out if clicked inside of star chart

    let meme = getMeme()

    const {
        offsetX,
        offsetY
    } = ev
    console.log('canvasClicked -> offsetX', offsetX)
    console.log('canvasClicked -> offsetY', offsetY)
    // var clickedLine = getMeme().lines.find(line => {
    //     return offsetX > line.posX &&
    //         offsetX < gElCanvas.width &&
    //         offsetX > gElCanvas.width &&
    //         offsetX < line.posX &&
    //         offsetY > line.posY - 10 &&
    //         offsetY < line.posY + 10
    // })

    // console.log('clickedLine:', clickedLine)
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
}

function showMemeEditor(el) {
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.meme-editor-container').classList.remove('hidden')
    document.querySelector('.meme-editor-container').classList.remove('hidden-childs')
    choosenImage(el)
    createMeme(el.id)
    onAddLine()
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
    let selectedFillColor = document.querySelector('#fill-color').value
    changeFillColor(selectedFillColor)
    setTimeout(function () {
        renderText()
    }, 0.1)
}

function onChooseBorderColor() {
    let selectedBorderColor = document.querySelector('#border-color').value
    changeBorderColor(selectedBorderColor)
    setTimeout(function () {
        renderText()
    }, 0.1)
}

function chooseTextAlign(el) {
    if (el.classList.contains('align-left')) changeTextAlign('left')
    else if (el.classList.contains('align-center')) changeTextAlign('center')
    else if (el.classList.contains('align-right')) changeTextAlign('right')
    renderCanvas()
}


function chooseFont() {
    let elSelectFont = document.getElementById('impact')
    ChangeFont(elSelectFont.value)
    renderCanvas()
}


function onDeleteLine() {
    deleteLine()
    drawImg()
    drawText()
    // renderText()
    // renderCanvas()
}

function onChangeFontSize(el) {
    if (el.id === 'minus')
        // gFontSize -= 10
        ChangeFontSize('minus')
    else if (el.id === 'plus')
        // gFontSize += 10
        ChangeFontSize('plus')
    renderCanvas()
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'canvas.png'
}

function openSideNav() {
    let elScreen = document.querySelector('.nav-screen')
    let elNav = document.querySelector('.nav-list')
    elScreen.style.display = 'block'
    elNav.classList.add('openNav')
}

function closeSideNav() {
    let elScreen = document.querySelector('.nav-screen')
    let elNav = document.querySelector('.nav-list')
    elScreen.style.display = 'none'
    elNav.classList.remove('openNav')

}

function switchLines() {
    let meme = getMeme()
    if (meme.selectedLineIdx === 1)
        meme.selectedLineIdx = 2;
    else if (meme.selectedLineIdx === 2) {
        meme.selectedLineIdx = 1;
    }
    // drawImage()
    drawImg()

    setTimeout(function () {
        drawText()
        MarkText()
    }, 0.1)
}

function renderText() {
    getMeme().lines.forEach((line) => {
        drawText();
    });
}

// function renderText() {
//     let meme = getMeme()
//     let currLineIdx = meme.selectedLineIdx;
//     meme.lines.forEach((line, idx) => {
//         console.log('idx:', idx)
//         // if (meme.lines === 0) return
//         drawText()
//         meme.selectedLineIdx = idx;
//     })
//     meme.selectedLineIdx = currLineIdx
// }

function renderCanvas() {
    drawImg()
    setTimeout(function () {
        renderText()
    }, 0.1)
}

function onUp() {
    textUp()
    renderCanvas()
}

function onDown() {
    textDown()
    renderCanvas()
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
    }
}

// function drawText() {
//     let meme = getMeme()
//     if (!meme) return

//     var currLine = meme.lines[meme.selectedLineIdx - 1]

//     if (currLine.textAlign === '') currLine.textAlign = 'center'
//     if (currLine.fontSize === '') currLine.textAlign = '40'
//     gCtx.lineWidth = 2;
//     gCtx.strokeStyle = currLine.borderColor;
//     gCtx.fillStyle = currLine.fillColor;
//     gCtx.font = `${currLine.fontSize}px ${currLine.font}`;
//     gCtx.textAlign = currLine.textAlign;
//     gCtx.fillText(currLine.txt, currLine.posX, currLine.posY);
//     gCtx.strokeText(currLine.txt, currLine.posX, currLine.posY);
// }

function drawText() {
    let meme = getMeme()
    meme.lines.forEach((line, idx) => {

        gCtx.lineWidth = 2;
        gCtx.strokeStyle = line.borderColor
        gCtx.fillStyle = line.fillColor
        gCtx.font = `${line.fontSize}px ${line.font}`
        gCtx.textAlign = line.textAlign
        gCtx.fillText(line.txt, line.posX, line.posY)
        gCtx.strokeText(line.txt, line.posX, line.posY)
    })
}