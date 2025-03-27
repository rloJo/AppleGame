//contents
const $root = document.querySelector(':root');
const styles = window.getComputedStyle($root);
const numRows = styles.getPropertyValue('--num-rows');
const numCols = styles.getPropertyValue('--num-cols');
const duration = styles.getPropertyValue('--duration');

//elements
const $board = document.querySelector('#board');
const $appleIcon = document.querySelector('#apple-icon');
const $start = document.querySelector('#start');
const $apples = [];
const $socre = document.querySelector('#score span');
const $progress = document.querySelector('#progress div');
const $finalScore = document.querySelector('#final-score');
//variables
let playing = false;
let dragging = false;
let pos1 = null;
let pos2 = null;
let score;
let timerId = null;

init();
function init(){
    for(let row =0; row < numRows; row++){
        for(let col = 0; col < numCols; col++){
            const $apple = document.createElement('div');
            $apple.className = 'apple';

            const $icon = document.importNode($appleIcon,true);
            $icon.removeAttribute('id');
            
            const $number = document.createElement('span');
            $apple.addEventListener('mousedown',(e) => dragBegin(e, row,col));
            $apple.addEventListener('mousemove',(e) => dragMove(e, row, col));
            $apple.addEventListener('mouseup',(e)=> dragEnd(e));

            $apple.appendChild($icon);
            $apple.appendChild($number);
            $board.appendChild($apple);

            $apples.push($apple);
        }
    }

    document.addEventListener('mousemove',(e) => dragEnd(e));
    $start.addEventListener('click',start);

    $appleIcon.remove();
}

function start(){
    playing = true;
    score = 0;

    $socre.textContent = score;
    $board.classList.add('playing');
    $start.textContent = "reset";

    $progress.classList.remove('playing');
    $progress.offsetHeight;
    $progress.classList.add('playing');

    if(timerId){
        clearTimeout(timerId);
    }
    timerId = setTimeout(end, duration * 1000);


    for(const $apple of $board.querySelectorAll('.collected')){
        $apple.classList.remove('collected');
    }

    for(const $apple of $apples){
        $apple.querySelector('span')
        .textContent = Math.floor(Math.random()*9)+1;

    }
}

function end(){
    dragEnd();

    playing = false;

    $board.classList.remove('playing');
    $start.textContent = "start";
    $finalScore.textContent = score;
}

function dragBegin(e,row, col){
    e.stopPropagation();

    if(!playing) return;

    dragging = true;

    pos1 = [row,col];
    pos2 = [row,col];
}

function dragMove(e, row, col){

    e.stopPropagation();

    if(!playing || !dragging) return;

    pos2 = [row,col];

    drawSelection();
}

function dragEnd(e){
    if(e){
        e.stopPropagation();
    }
    if(!playing) return;
    dragging = false;
    collect();
    clearSelection();
}

function collect(){
    let sum = 0;
    const $selectedApples = $board.querySelectorAll('.apple.selected:not(.collected)');
    
    for(const $apple of $selectedApples){
        sum += Number($apple.textContent);
    }

    if(sum != 10) return;

    for(const $apple of $selectedApples){
        $apple.classList.add('collected');
    }

    score += $selectedApples.length;
    $socre.textContent = score;
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
