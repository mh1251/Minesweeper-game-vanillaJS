import  mineSweeper from './minesweeperClass.js';

let grid = document.querySelector(".grid");
let flagsLeft = document.getElementById("flags-left");
let width5 = document.getElementById("5")
let width10 = document.getElementById("10")

width5.addEventListener("click", ()=>{
  grid.innerHTML = '';
  let newMinesweeper =  new mineSweeper(grid, 5, flagsLeft);
  newMinesweeper.createBoard()
  width5.disabled = true;
  width10.disabled = false;
})

width10.addEventListener("click", ()=>{
    grid.innerHTML = '';
    let newMinesweeper = new mineSweeper(grid, 10, flagsLeft);
    newMinesweeper.createBoard()
    width10.disabled = true;
    width5.disabled = false;
})

