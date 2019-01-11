const pixelPainterMod = function (){

//Array for availble colors stored in pallet.
const arrColors = ['purple','red','blue','green', 'brown', 'orange', 'yellow', 'pink','black', 'white'];

//Aray for available shapes stored in ShapeToolbox.
const arrShapes = ['square']
const stampShape = {square:[[-1,-1], [0,1], [1,-1], [1,0], [1,1], [0,1], [-1,1],[-1,0]]};

//Changing variables which help the EventListeners.
let mouseClick = false;
let mouseClr = '';
let saveFile = '';
let currShape = '';
let currCellId = 0;
let currRowId = 0;

const getPP = document.getElementById('pixelPainter');

const mouseColor = function(){
    mouseClr = this.style.backgroundColor;
};

const createButton = document.createElement('button');

const clearCanvas = getPP.appendChild(createButton);

clearCanvas.id = 'clear';
clearCanvas.innerHTML = 'Clear All';
clearCanvas.addEventListener('click', clrTbl);


const createSaveButton = document.createElement('button');

createSaveButton.id = 'save';
createSaveButton.innerHTML = 'Save';
createSaveButton.addEventListener('click', saveArt);
getPP.appendChild(createSaveButton);

const createLoadButton = document.createElement('button');

createLoadButton.id = 'load';
createLoadButton.innerHTML = 'Load Image';
createLoadButton.addEventListener('click', loadArt);
getPP.appendChild(createLoadButton);


const shapeTool = function(irow){
    let shapeToolbox = document.createElement('table');
    shapeToolbox.id = 'Tools';
    getPP.appendChild(shapeToolbox);
    for(let i = 0; i < irow; i++){
        let toolRow = shapeToolbox.appendChild(document.createElement('tr'));
        for(let x = 0; x < arrShapes.length; x++){
           let toolCell = toolRow.appendChild(document.createElement('td'));
           toolCell.className = 'toolCell'; 
           toolCell.addEventListener('click', appShape);
           toolCell.id = arrShapes[i];
           toolCell.innerHTML = arrShapes[i];
        }
    }
}

shapeTool(1,10);


const paintTool = function(irow,icol){
    let paintTbl = document.createElement('table');
    paintTbl.id = 'paintTbl';
    getPP.appendChild(paintTbl);
    for(let i = 0; i < irow; i++){
        let paintRow = paintTbl.appendChild(document.createElement('tr'));
        for(let x = 0; x < icol; x++){
            let paintCell = paintRow.appendChild(document.createElement('td'));
            paintCell.className = 'PaintCell';
            paintCell.addEventListener('click', mouseColor);
        }
    }
    return paintTbl;
}

paintTool(1,10);


const addPTColor = function(){
    for(let i = 0; i < arrColors.length; i++){
        let paintCell = document.getElementsByClassName('PaintCell');
        paintCell[i].style.backgroundColor = arrColors[i];
        if(arrColors[i] === 'white'){
            paintCell[i].innerHTML = 'Eraser';
            paintCell[i].id = 'Eraser';
        }

    }
}
addPTColor();


let gridDiv = document.createElement('div');
gridDiv.id = 'grid';
getPP.append(gridDiv);


const createCanvas = function(irow, icol){
    let tbl = document.createElement('table');
    tbl.className = 'table';
    tbl.id = 'gridTable';
    gridDiv.appendChild(tbl);
    for(let i = 0; i < irow; i++){
        let tabler = tbl.appendChild(document.createElement('tr'))
        
        for(let x = 0; x < icol; x++){
           let cell = tabler.appendChild(document.createElement('td'))
           cell.className = 'cell';
           cell.id = x
           cell.addEventListener('click', initiateBC);
           cell.addEventListener('mouseover', drawBC);
        }
    }
    return tbl;
};

const drawBC = function(){
    if(mouseClick === true){
        this.style.backgroundColor = mouseClr;
    }
};



const initiateBC = function (){
    let currCoord = this.id;
    let coordArr = currCoord.split('y');
    coordArr[0] = parseInt(coordArr[0].replace('x',''));
    coordArr[1] = parseInt(coordArr[1]);
    console.log(coordArr);


    if(currShape === ''){
        if(mouseClick === true){
            mouseClick = false;
        }else if(mouseClick === false && mouseClr !== ''){
            this.style.backgroundColor = mouseClr;
            mouseClick = true;
        }
    }else{
        if(currShape === 'square'){


            
            console.log(currShape);
            currCellId = parseInt(this.id);
            currRowId = parseInt(this.parentNode.id);
            console.log(currCellId);
            console.log(currRowId);
            const getTable = document.getElementById('gridTable');
            getTable.rows[currRowId].cells[currCellId].style.backgroundColor = mouseClr;
            getTable.rows[currRowId].cells[currCellId + 1].style.backgroundColor = mouseClr;
            getTable.rows[currRowId].cells[currCellId + 2].style.backgroundColor = mouseClr;
            getTable.rows[currRowId + 1].cells[currCellId].style.backgroundColor = mouseClr;
            getTable.rows[currRowId + 2].cells[currCellId].style.backgroundColor = mouseClr;
            getTable.rows[currRowId + 1].cells[currCellId + 2].style.backgroundColor = mouseClr;
            getTable.rows[currRowId + 2].cells[currCellId + 2].style.backgroundColor = mouseClr;
            getTable.rows[currRowId + 2].cells[currCellId + 1].style.backgroundColor = mouseClr;
            getTable.rows[currRowId + 2].cells[currCellId + 2].style.backgroundColor = mouseClr;
            getTable.rows[currRowId + 2].cells[currCellId + 2].style.backgroundColor = mouseClr;



            }
    // }else if(currShape === 'square'){
    //     currCellId = parseInt(this.id);
    //     for(i = 0; i < 4; i++){
    //         let sqPos = document.getElementById(currCellId + i);
    //         let sqPosSides = document.getElementById(currCell + 120);
    //         let sqPosRside = document.getElementById(currCellId + 124);
    //         sqPos.style.backgroundColor = mouseClr;
    //         sqPosSides.style.backgroundColor = mouseClr;

        }

};

createCanvas(40,120);



function clrTbl(){
    let pCellsAll = document.getElementsByClassName('cell');
    for(i = 0; i < pCellsAll.length; i++){
        pCellsAll[i].style.backgroundColor = 'white';
    }

};

function saveArt(){
    saveFile = document.getElementById('grid').innerHTML;
    console.log(saveFile);
};


function loadArt(){
    let gridBox = document.getElementById('grid');
    let getCell = document.getElementsByClassName('cell')
    gridBox.innerHTML = saveFile;
    for(let i = 0; i < getCell.length; i++){
        getCell[i].addEventListener('click', initiateBC);
        getCell[i].addEventListener('mouseover', drawBC);
    };
}

function appShape(){
    if(currShape === ''){
    currShape = this.id;
    }else{
        currShape = '';
    }
}



}();