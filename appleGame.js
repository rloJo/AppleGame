//contents
const $root = document.querySelector(':root');
const styles = window.getComputedStyle($root);
const numRows = styles.getPropertyValue('--num-rows');
const numCols = styles.getPropertyValue('--num-cols');

//elements
const $board = document.querySelector('#board');
const $appleIcon = document.querySelector('#apple-icon');
const $apples = [];

//variables
let dragging = false;
let pos1 = null;
let pos2 = null;


init();
function init(){
    for(let row =0; row < numRows; row++){
        for(let col = 0; col < numCols; col++){
            const $apple = document.createElement('div');
            $apple.className = 'apple';

            const $icon = document.importNode($appleIcon,true);
            $icon.removeAttribute('id');
            
            const $number = document.createElement('span');
            $number.textContent = 5;
            $number.textContent = Math.floor(Math.random()*9)+1;
            $apple.addEventListener('mousedown',() => dragBegin(row,col));
            $apple.addEventListener('mousemove',() => dragMove(row, col));
            $apple.addEventListener('mouseup',dragEnd);

            $apple.appendChild($icon);
            $apple.appendChild($number);
            $board.appendChild($apple);

            $apples.push($apple);
        }
    }
}

function dragBegin(row, col){
    dragging = true;
    pos1 = [row,col];
    pos2 = [row,col];
}

function dragMove(row, col){
    if(!dragging) return;
    pos2 = [row,col];
    drawSelection();
}

function dragEnd(){
    dragging = false
    clearSelection();
}

function collect(){
    let sum = 0;
    const $selectedApples = $board.querySelectorAll('.apple.selected');
    for(const $apple of $selectedApples){
        sum += Number($apple.textContent);
    }

    if(sum != 10) return;

    for(const $apple of $selectedApples){
        $apple.classList.add('collected');
    }
}



function clearSelection(){
    for(const $apple of $board.querySelectorAll('.apple.selected')){
        $apple.classList.remove('selected');
    }
}

function drawSelection(){
    clearSelection();
    const  minRow = Math.min(pos1[0],pos2[0]);
    const  minCol = Math.min(pos1[1],pos2[1]);
    const  maxRow = Math.max(pos1[0],pos2[0]);
    const  maxCol = Math.max(pos1[1],pos2[1]);

    for(let row = minRow;row<=maxRow;row++){
        for(let col = minCol; col<=maxCol; col++){
            const $apple = $apples[row*numCols+col];

            $apple.classList.add('selected');
        }
    }
}
