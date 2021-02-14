'use strict'

var gElCanvas
var gCtx
var gLinesCount = 0
var gImgId = 0
var gTextAlign = ''
var gFontSize = 40
var gStartPos;
var gCurrLine = 0
// var currLineIdx = meme.selectedLineIdx - 1
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];



function onInit() {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGalleryImages()
    enableEnter()
    // addListeners()
}


function enableEnter() {
    var input = document.getElementById('text');
    input.addEventListener("keyup", function (event) {
        if (event.key === 13) {
            event.preventDefault();
            document.getElementById('submit-btn').click();
        }
    });
}

function onInputText() {
    let elTextInput = document.getElementById('text')
    let text = elTextInput.value

    let meme = getMeme()
    if (!meme) return
    let currLine = meme.lines[meme.selectedLineIdx - 1]
    // drawImg()
    currLine.txt = text
    setTimeout(function () {
        MarkText()
        // currLine.isActive = false
        // drawText()
    }, 2)
    currLine.isActive = true

    currLine.textSize = gCtx.measureText(currLine.txt).width
    renderCanvas()
}

function onAddLine() {
    let elTextInput = document.getElementById('text')
    let meme = getMeme()
    if (!meme) return
    if (meme.selectedLineIdx === 0) {
        addLine('Enter Text', gElCanvas.height - 200, gElCanvas.height - 350)
        // MarkText()
    } else if (meme.selectedLineIdx === 1) {
        addLine('Enter Text', gElCanvas.height - 200, gElCanvas.height - 20)

    } else meme.selectedLineIdx = 0

    meme.selectedLineIdx++
    elTextInput.value = ''

    let currLine = meme.lines[meme.selectedLineIdx - 1]
    // console.log('currLine:', currLine)
    currLine.isActive = true
    setTimeout(function () {
        // MarkText()
    }, 2)

    renderCanvas()
}

function MarkText() {
    let meme = getMeme()
    if (!meme) return

    let currLine = meme.lines[meme.selectedLineIdx - 1]
    // console.log('currLine:', currLine)
    // if (!meme.lines) return


    if (currLine.isActive) {
        // let meme = getMeme()
        // let currLine = meme.lines[meme.selectedLineIdx - 1]
        MarkTextPosition(currLine.posX, currLine.posY)
    }
}

function MarkTextPosition(x, y) {
    let meme = getMeme()
    let currLine = meme.lines[meme.selectedLineIdx - 1]
    gCtx.beginPath()
    gCtx.rect(x - currLine.textSize / 2, y - currLine.fontSize, currLine.textSize, currLine.fontSize)
    gCtx.strokeStyle = 'red'
    gCtx.lineWidth = 1;
    // gCtx.setLineDash([6]);
    gCtx.stroke()
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
        renderCanvas()
    }, 0.1)
}

function onChooseBorderColor() {
    let selectedBorderColor = document.querySelector('#border-color').value
    changeBorderColor(selectedBorderColor)
    setTimeout(function () {
        renderCanvas()
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
    renderCanvas()
    // renderText()
    // renderCanvas()
}


function onChangeFontSize(el) {
    let fontSize = document.getElementById('fontSize').value
    ChangeFontSize(fontSize)
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
    drawImg()

    setTimeout(function () {
        drawText()
        // renderCanvas()
        MarkText()
    }, 0.1)
}


function renderCanvas() {
    drawImg()
    setTimeout(function () {
        drawText()
    }, 0.1)
}
// function renderCanvas() {
//     drawImg()
//     setTimeout(function () {
//         renderText()
//     }, 0.1)
// }

function onUp() {
    textUp()
    renderCanvas()
}

function onDown() {
    textDown()
    renderCanvas()
}

function onRight(){
    textLeft()
    renderCanvas() 
}

function onLeft(){
    textRight()
    renderCanvas() 
}


function isLineClicked(clickedPos) {
    let meme = getMeme();
    let currLine = meme.lines[meme.selectedLineIdx - 1]
    if (!currLine) return;
    var lineIdx = meme.lines.findIndex(line => {
        return (clickedPos.x >= line.posX - line.textSize / 2) &&
            (clickedPos.x <= line.posX + line.textSize / 2) &&
            (clickedPos.y >= line.posY - line.fontSize) &&
            (clickedPos.y <= line.fontSize);
    });

    if (lineIdx !== -1) {
        currLine = (lineIdx + 1)
        console.log('currLine:', currLine)
        console.log('yes');
        meme.lines[meme.selectedLineIdx - 1].isMarked = true
        setTimeout(function () {
            MarkText()
        }, 0.05)
        return true
    }
}


// function getEvPos(ev) {
//     var pos = {
//         x: ev.offsetX,
//         y: ev.offsetY
//     }
//     console.log('pos:', pos)

//     if (gTouchEvs.includes(ev.type)) {
//         ev.preventDefault();
//         ev = ev.changedTouches[0];
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
//         }
//     }
//     return pos;
// }

// function onUp() {
//     let meme = getMeme()
//     if (!meme) return
//     let currLine = meme.selectedLineIdx - 1
//     if (!currLine) return;

//     meme.lines[currLine].isDragging = false;
//     document.body.style.cursor = 'grab';
// }


// function onMove(ev) {
//     let meme = getMeme()
//     if (!meme) return
//     let currLine = meme.selectedLineIdx - 1
//     if (!currLine) return;

//     if (meme.lines[currLine].isDragging) {
//         const pos = getEvPos(ev)
//         const dx = pos.x - gStartPos.x
//         const dy = pos.y - gStartPos.y

//         meme.lines[currLine].posX += dx;
//         meme.lines[currLine].posY += dy;


//         gStartPos = pos;
//         renderCanvas()

//     }
// }

// function onDown(ev) {
//     let meme = getMeme()
//     if (!meme) return
//     let currLine = meme.selectedLineIdx - 1
//     if (!currLine) return;
//     const pos = getEvPos(ev);

//     if (!isLineClicked(pos)) return
//     meme.lines[currLine].isDragging = true;
//     gStartPos = pos;
//     document.body.style.cursor = 'grabbing';

// }

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousemove', onMove)

//     gElCanvas.addEventListener('mousedown', onDown)

//     gElCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchmove', onMove)

//     gElCanvas.addEventListener('touchstart', onDown)

//     gElCanvas.addEventListener('touchend', onUp)
// }


// function addListeners() {
//     addMouseListeners()
//     addTouchListeners()
//     // window.addEventListener('resize', () => {
//     //     resizeCanvas()
//     //     drawMeme(gImg);
//     // });
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
    }
}

function drawText() {
    let meme = getMeme()
    meme.lines.forEach((line) => {

        gCtx.lineWidth = 2;
        gCtx.strokeStyle = line.borderColor
        gCtx.fillStyle = line.fillColor
        gCtx.font = `${line.fontSize}px ${line.font}`
        gCtx.textAlign = line.textAlign
        gCtx.fillText(line.txt, line.posX, line.posY)
        gCtx.strokeText(line.txt, line.posX, line.posY)
    })
}