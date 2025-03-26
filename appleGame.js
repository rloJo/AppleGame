const $root = document.querySelector(':root');
const styles = window.getComputedStyle($root);
const numRows = styles.getPropertyValue('--num-rows');
const numCols = styles.getPropertyValue('--num-cols');

const $board = document.querySelector('#board');
const $appleIcon = document.querySelector('#apple-icon');

init();
function init(){
    for(let row =0; row < numRows; row++){
        for(let col = 0; col < numCols; col++){
            const $apple = document.createElement('div');
            $apple.className = 'apple';
            const $icon = document.importNode($appleIcon,true);
            $apple.appendChild($icon);
            $board.appendChild($apple);
        }
    }

}