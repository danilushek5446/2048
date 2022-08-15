
const downReс = function rec(i, j, gridArray){
  if(j === 3) return;
  const index = i + j * 4;
  const currentGridCell = gridArray[index].querySelector('div');
  const nextGridCell = gridArray[index + 4].querySelector('div');
  
  if (gridArray[index + 4].querySelectorAll('div').length != 0 && (currentGridCell.innerText != nextGridCell.innerText)) {
    console.log('im here');
    rec(i, j + 1, gridArray);
  } 

  if(gridArray[index + 4].querySelectorAll('div').length == 0){
    gridArray[index + 4].appendChild(currentGridCell);
  } else if(currentGridCell.innerText == nextGridCell.innerText){
    const text = currentGridCell.innerText;

    currentGridCell.remove();
    nextGridCell.innerText = +text * 2;
    nextGridCell.classList.add(`${+text * 2}`)
    nextGridCell.classList.remove('text')
    gridArray[index + 4].appendChild(nextGridCell);

  }
};

const down = function(){
  const gridArray = Array.from(document.querySelectorAll('.grid_cell'));
  console.log(gridArray);
  for(let i = 0; i < 4; i++ ){
    for(let j = 0; j < 3; j++ ){
      const index = i + j * 4;
      const currentGridCell = gridArray[index].querySelector('div');
      const nextGridCell = gridArray[index + 4].querySelector('div');

      if(gridArray[index].querySelectorAll('div').length == 0) {
        continue;
      }

      if (gridArray[index + 4].querySelectorAll('div').length != 0 && (currentGridCell.innerText != nextGridCell.innerText)) {
        downReс(i, j + 1, gridArray);
      }

      if(gridArray[index + 4].querySelectorAll('div').length == 0){
        gridArray[index + 4].appendChild(currentGridCell);
      } else if(currentGridCell.innerText == nextGridCell.innerText){
        const text = currentGridCell.innerText;

        currentGridCell.remove();
        nextGridCell.innerText = +text * 2;
        nextGridCell.classList.add(`${+text * 2}`)
        nextGridCell.classList.remove('text')
        gridArray[index + 4].appendChild(nextGridCell);

      } 
    }
  }
}


document.addEventListener('keyup', (event) =>{
  if(event.key == "ArrowDown"){
    down();
  } 

 })