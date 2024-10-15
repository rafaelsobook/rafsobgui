const log = console.log;

let G;
let ADT // advancedDynamic Texture FullScreenUI
let GBtn
let GText
let Ggrid
let GRect

function bylonUIInit(_GUI) {
    G = _GUI
    GBtn = _GUI.Button
    GText = _GUI.TextBlock
    Ggrid = _GUI.Grid
    GRect = _GUI.Rectangle
    GCheckBx = _GUI.Checkbox
    if (!ADT) ADT = G.AdvancedDynamicTexture("ADT_GUI")
}
function createBtn(btnLabel, _ADTexture, buttonImg, _width, _height, _fontS, _background) {
    let btn
    if (buttonImg) {
        console.log("running")
        btn = GUI.Button.CreateImageButton("button", btnLabel, buttonImg)
    } else btn = GUI.Button.CreateSimpleButton("button", btnLabel)


    let defWidth = .6
    let defBackgroundC = "#27282a";

    btn.width = _widthInNum ? _widthInNum : defWidth
    btn.height = _height ? _height : defWidth / 1.5
    btn.fontSize = _fontS ? _fontS : (defWidth * 90)
    btn.background = _background ? _background : defBackgroundC
    btn.color = "white"

    if (_ADTexture) _ADTexture.addControl(btn)
    return btn
}
function createRowsOfText(_arrayOfText, _fontS, parentUI) {
    const grid = new Ggrid("grid")
    const textBlocks = []
    let size = 1 / _arrayOfText.length
    _arrayOfText.forEach((txt, indx) => {
        const txtBlock = createTxt(txt, _fontS, "white")
        grid.addRowDefinition(size)
        grid.addControl(txtBlock, indx, 0)
        if (_arrayOfText.length <= 3) grid.addRowDefinition(size)

        textBlocks.push(txt)
    })
    parentUI.addControl(grid)
    return { grid, textBlocks }
}
function createGrid(parentUI, rowsSizesArray, columnSizesArray) {
    const grid = new Ggrid("grid")

    if (rowsSizesArray) {
        if (!rowsSizesArray.length) return log("rowSizeArray must be an array of sizes ex. [.1,.2,.5]")
        rowsSizesArray.forEach(size => {
            grid.addRowDefinition(size)
        })
    }
    if (columnSizesArray) {
        if (!columnSizesArray.length) return log("columnSizesArray must be an array of sizes ex. [.1,.2,.5]")
        columnSizesArray.forEach(size => {
            grid.addColumnDefinition(size)
        })
    }
    if (parentUI) parentUI.addControl(grid) // could be a rectangle or another grid
    return grid
}
function createRect(_childUI, _defWidthInNum, _defHeightInNum, _ADTexture, _cornerRadius, _background) {
    const rect = new GRect("rectangle")

    let width = _defWidthInNum ? _defWidthInNum : .8
    let height = _defHeightInNum ? _defHeightInNum : .5
    let defBackgroundC = "#27282a";

    if (_childUI) {
        if (_childUI.length) {
            _childUI.forEach(chld => rect.addControl(chld))
        } else {
            rect.addControl(_childUI)
        }
    }

    rect.width = width
    rect.height = height
    rect.background = _background ? _background : defBackgroundC
    rect.cornerRadius = _cornerRadius ? _cornerRadius : 3

    if (_ADTexture) _ADTexture.addControl(rect)

    return rect
}
function createTxt(_textLabel, _fontSize, _color) {
    const textBlock = new GUI.TextBlock("textblock", _textLabel)
    textBlock.color = _color ? _color : "white"
    textBlock.fontSize = _fontSize ? _fontSize : "40px"
    return textBlock
}
function createCheckBox(_label, _ADTexture, _isChecked, _callBWhenValueChanged, _bxSize, _fontS, _background, _isBxPositionLeft) {
    // let checkBx = new GUI.Checkbox.AddCheckBoxWithHeader("checkbox: ", _callBWhenValueChanged)
    const checkBx = new GCheckBx("checkbox")
    checkBx.isChecked = _isChecked
    checkBx.onIsCheckedChangedObservable.add(_callBWhenValueChanged)

    const header = GUI.Checkbox.AddHeader(checkBx, _label, _fontS ? _fontS : "100px", {
        isHorizontal: true, controlFirst: _isBxPositionLeft
    })
    let defSize = "25px"
    let defBackgroundC = "#27282a";

    header.color = "red"
    checkBx.width = _bxSize ? _bxSize : defSize
    checkBx.height = _bxSize ? _bxSize : defSize
    checkBx.color = "white"
    checkBx.background = _background ? _background : defBackgroundC


    if (_ADTexture) {
        _ADTexture.addControl(checkBx)
        _ADTexture.addControl(header)
    }

    return { checkBx, header }
}
function bguiTest() {
    return log("bgui is working")
}

module.exports = {
    bylonUIInit,
    createBtn,
    createRowsOfText,
    createGrid,
    createRect,
    createTxt,
    createCheckBox,
    bguiTest
}

// EXAMPLE USAGE IN BABYLONJS
// const plane = MeshBuilder.CreatePlane("ad", { width: 1, height: 1}, scene)
// const adtForMesh = GUI.AdvancedDynamicTexture.CreateForMesh(plane)
// const rect = createRect(false, .9,1, adtForMesh)
// const grid = createGrid(rect, [.1,.1,.1,.7],false)

// const gridForNameAndLevel = createGrid(false, [.5], [.5,.5])
// gridForNameAndLevel.addControl(createTxt("Name: Rafael"), 0,0)
// gridForNameAndLevel.addControl(createTxt("Level: 103"), 0,1)
// grid.addControl(gridForNameAndLevel, 0,0)

// const gridForStats = createGrid(false, [.5], [.3,.8])
// gridForStats.addControl(createTxt("Strength Lvl. 2"), 0,0)
// gridForStats.addControl(createBtn("Power Up", "22px", false,false, .5, .5), 0,1)
// grid.addControl(gridForStats, 1,0)

// const rect2 = createRect(false, 1,.3)
// grid.addControl(rect2,2,0)
