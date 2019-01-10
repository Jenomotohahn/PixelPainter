let pixelPainterMod = function (){

const arrColors = ['purple','red','blue','green', 'brown', 'orange', 'yellow', 'pink','black', 'white'];

let mouseClick = false;
let mouseClr = '';

const getPP = document.getElementById('pixelPainter');

const mouseColor = function(){
    mouseClr = this.style.backgroundColor;
};

const createButton = document.createElement('button');

const clearCanvas = getPP.appendChild(createButton);
clearCanvas.id = 'clear';
clearCanvas.innerHTML = 'Clear All';
clearCanvas.addEventListener('click', clrTbl);


const paintTool = function(irow,icol){
    let paintTbl = document.createElement('table');
    paintTbl.id = 'paintTbl';
    getPP.appendChild(paintTbl);
    for(let i = 0; i < irow; i++){
        paintRow = paintTbl.appendChild(document.createElement('tr'));
        for(let x = 0; x < icol; x++){
            paintCell = paintRow.appendChild(document.createElement('td'));
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
        if(mouseClick === true){
            mouseClick = false;
        }else if(mouseClick === false && mouseClr !== ''){
            this.style.backgroundColor = mouseClr;
            mouseClick = true;
        }
};

createCanvas(40,120);



function clrTbl(){
    let pCellsAll = document.getElementsByClassName('cell');
    for(i = 0; i < pCellsAll.length; i++){
        pCellsAll[i].style.backgroundColor = 'white';
    }

};


}();