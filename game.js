
let gridArray = [4, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 4, 2, 0, 2];
let score = 0;
let bestScore = 0;
const retryButton = document.querySelector('#retry-button');
const newGameButton = document.querySelector('#new-game-button');

const render = (renderGridArray) =>{
  const domGridArray = Array.from(document.querySelectorAll('.grid_cell'));
  const scoreText = document.querySelector('#score-value');
  const bestScoreText = document.querySelector('#best-score-value');

  for( let i = 0; i < renderGridArray.length; i++){
    if(renderGridArray[i] != 0){
      const div = `<div class="content${renderGridArray[i]}">${renderGridArray[i]}</div>`;
      domGridArray[i].innerHTML = div;
    }else{
      domGridArray[i].innerHTML = '';
    }
  }

  if(score > bestScore){
    bestScore = score;
    localStorage.setItem('bestScore', bestScore);
    bestScoreText.innerHTML = bestScore;
  }

  scoreText.innerHTML = score;
};

const gameOver = () =>{
  const div = document.querySelector('#game-over');
  div.style.display = "flex";
};

const isGameOver = (array) => {
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      const index = i * 4 + j;
      if ((array[index] === array[index + 4]) || (array[index] === array[index + 1]) )
      return false;
    }
  }
  for(let i = array.length - 4; i < array.length; i++){
    if(array[i] === array[i + 1]){
      return false;
    }
  }
  return true;
}

const random = (randArray) =>{
  let indexesArray = []
  if(randArray.includes(0)){
    for(let i = 0; i < randArray.length; i++){
      if(randArray[i] === 0) {
        indexesArray.push(i);
      }
    }
    if(indexesArray.length === randArray.length ){
      const randIndex = Math.floor(Math.random() * indexesArray.length);
      let randValue = 0;
      if(Math.floor(Math.random() * 10) === 0){
        randValue = 4;
      }else {
        randValue = 2;
      }
      randArray[indexesArray[randIndex]] = randValue;
      indexesArray.splice(randIndex, 1);
    }
    let randValue = 0;
    if(Math.floor(Math.random() * 10) === 0){
      randValue = 4;
    }else {
      randValue = 2;
    }
    const randIndex = Math.floor(Math.random() * indexesArray.length);
    randArray[indexesArray[randIndex]] = randValue;
    return randArray;
  }else {
    if(isGameOver(randArray)){
      gameOver();
      return randArray;
    }else {
      return randArray;
    }
  }
};

retryButton.addEventListener('click', () => {
  const div = document.querySelector('#game-over');
  div.style.display = "none";
  gridArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  gridArray = random(gridArray);
  render(gridArray);
})



const downReс = function rec(i, j, recGridArray, skipIndex, flag){

  if(j === 3 ) {
    return (flag);
  } else{
    const index = i + (j * 4);
    
  
  if (recGridArray[index + 4] !== 0 && (recGridArray[index] !== recGridArray[index + 4])) {
    rec(i, j + 1, recGridArray, skipIndex, flag);
  } 

  if(recGridArray[index + 4] === 0){
    if(skipIndex.includes(index)){
      skipIndex.push(index + 4);
    }
    flag = true;
    recGridArray[index + 4] = recGridArray[index];
    recGridArray[index] = 0;
  } else if((recGridArray[index] === recGridArray[index + 4]) && !skipIndex.includes(index) && !skipIndex.includes(index + 4)){
    recGridArray[index + 4] = recGridArray[index] * 2;
    score += recGridArray[index] * 2;
    recGridArray[index] = 0;
    skipIndex.push(index + 4);
    flag = true;
  }

  rec(i, j + 1, recGridArray, skipIndex, flag);
  }
  return flag;
};

const down = (downGridArray) =>{
  let flag = false;
  let skipIndex = [];
  for(let i = 0; i < 4; i++ ){
    for(let j = 0; j < 3; j++ ){
      const index = i + j * 4;
      if(downGridArray[index] === 0) {
        continue;
      }

      if (downGridArray[index + 4] !== 0 && (downGridArray[index] !== downGridArray[index + 4])) {
        flag = downReс(i, j, downGridArray, skipIndex, flag);
      }
      const currentGridCell = downGridArray[index];
      const nextGridCell = downGridArray[index + 4];
      if(nextGridCell === 0){
        if(skipIndex.includes(index)){
          skipIndex.push(index + 4);
        }
        downGridArray[index + 4] = currentGridCell;
        downGridArray[index] = 0;
        flag = true;
      } else if((currentGridCell === nextGridCell) && !skipIndex.includes(index) && !skipIndex.includes(index + 4)){
        downGridArray[index + 4] = currentGridCell * 2;
        score += currentGridCell * 2;
        downGridArray[index] = 0;
        skipIndex.push(index + 4);
        flag = true;
      } 
    }
  }
  if (flag) random(downGridArray);
  if(!flag && !downGridArray.includes(0)){
    if(isGameOver(downGridArray)){
      gameOver();
    }
  }
  return(downGridArray);
}

const rightReс = function rec(i, j, recGridArray, skipIndex, flag){
  if(j === 3) {
    return (flag);
  } else{
    const index = i * 4 + j;
  
  if (recGridArray[index + 1] !== 0 && (recGridArray[index] !== recGridArray[index + 1])) {
    rec(i, j + 1, recGridArray, skipIndex, flag);
  } 

  if(recGridArray[index + 1] === 0){
    if(skipIndex.includes(index)){
      skipIndex.push(index + 1);
    }
    flag = true;
    recGridArray[index + 1] = recGridArray[index];
    recGridArray[index] = 0;
  } else if((recGridArray[index] === recGridArray[index + 1]) && !skipIndex.includes(index) && !skipIndex.includes(index + 1)){
    recGridArray[index + 1] = recGridArray[index] * 2;
    score += recGridArray[index] * 2;
    recGridArray[index] = 0;
    skipIndex.push(index + 1);
    flag = true;
  }

  rec(i, j + 1, recGridArray, skipIndex, flag);
  }
  return flag;
};

const right = (rightGridArray) =>{
  let flag = false;
  let skipIndex = [];
  for(let i = 0; i < 4; i++ ){
    for(let j = 0; j < 3; j++ ){
      const index = i * 4 + j;

      if(rightGridArray[index] === 0) {
        continue;
      }

      if (rightGridArray[index + 1] !== 0 && (rightGridArray[index] !== rightGridArray[index + 1])) {
        flag = rightReс(i, j, rightGridArray, skipIndex, flag);
      }
      const currentGridCell = rightGridArray[index];
      const nextGridCell = rightGridArray[index + 1];
      if(nextGridCell === 0){
        if(skipIndex.includes(index)){
          skipIndex.push(index + 1);  
        }
        flag = true;
        rightGridArray[index + 1] = currentGridCell;
        rightGridArray[index] = 0;
      } else if((currentGridCell === nextGridCell) && !skipIndex.includes(index) && !skipIndex.includes(index + 1)){
        rightGridArray[index + 1] = currentGridCell * 2;
        score += currentGridCell * 2;
        rightGridArray[index] = 0;
        skipIndex.push(index + 1);
        flag = true
      } 
    }
  }
  if(!flag && !rightGridArray.includes(0)){
    if(isGameOver(rightGridArray)){
      gameOver();
    }
  }
  if(flag) random(rightGridArray);
  return(rightGridArray);
}

const upReс = function rec(i, j, recGridArray, skipIndex, flag){
  if(i === 0) {
    return (flag);
  } else{
    const index = i * 4 + j;
  
  if (recGridArray[index - 4] !== 0 && (recGridArray[index] !== recGridArray[index - 4])) {
    rec(i - 1, j, recGridArray, skipIndex, flag);
  } 

  if(recGridArray[index - 4] === 0){
    if(skipIndex.includes(index)){
      skipIndex.push(index - 4);
    }
    flag = true;
    recGridArray[index - 4] = recGridArray[index];
    recGridArray[index] = 0;
  } else if((recGridArray[index] === recGridArray[index - 4]) && !skipIndex.includes(index) && !skipIndex.includes(index - 4)){
    recGridArray[index - 4] = recGridArray[index] * 2;
    score += recGridArray[index] * 2;
    recGridArray[index] = 0;
    skipIndex.push(index - 4);
    flag = true;
  }

  rec(i - 1, j, recGridArray, skipIndex, flag);
  }
  return flag;
};

const up = (upGridArray) =>{
  let flag = false;
  let skipIndex = []
  for(let i = 3; i > 0; i-- ){
    for(let j = 0; j < 4; j++ ){
      const index = i * 4 + j;

      if(upGridArray[index] === 0) {
        continue;
      }

      if (upGridArray[index - 4] !== 0 && (upGridArray[index] !== upGridArray[index - 4])) {
        flag = upReс(i, j, upGridArray, skipIndex, flag);
      }
      const currentGridCell = upGridArray[index];
      const nextGridCell = upGridArray[index - 4];
      if(nextGridCell === 0){
        if(skipIndex.includes(index)){
          skipIndex.push(index - 4);
        }
        flag = true;
        upGridArray[index - 4] = currentGridCell;
        upGridArray[index] = 0;
      } else if((currentGridCell === nextGridCell) && !skipIndex.includes(index) && !skipIndex.includes(index - 4)){
        upGridArray[index - 4] = currentGridCell * 2;
        score += currentGridCell * 2;
        upGridArray[index] = 0;
        skipIndex.push(index - 4);
        flag = true;
      } 
    }
  }
  if(flag) random(upGridArray);
  if(!flag && !upGridArray.includes(0)){
    if(isGameOver(upGridArray)){
      gameOver();
    }
  }
  return(upGridArray);
}


const leftReс = function rec(i, j, recGridArray, skipIndex, flag){
  if(j === 0) {
    return (flag);
  } else{
    const index = i * 4 + j;
  
  if (recGridArray[index - 1] !== 0 && (recGridArray[index] !== recGridArray[index - 1])) {
    rec(i, j - 1, recGridArray, skipIndex, flag);
  } 

  if(recGridArray[index - 1] === 0){
    if(skipIndex.includes(index)){
      skipIndex.push(index - 1);
    }
    flag = true;
    recGridArray[index - 1] = recGridArray[index];
    recGridArray[index] = 0;
  } else if((recGridArray[index] === recGridArray[index - 1]) && !skipIndex.includes(index) && !skipIndex.includes(index - 1)){
    recGridArray[index - 1] = recGridArray[index] * 2;
    score += recGridArray[index] * 2;
    recGridArray[index] = 0;
    skipIndex.push(index - 1);
    flag = true;
  }

  rec(i, j - 1, recGridArray, skipIndex, flag);
  }
  return flag;
};

const left = (leftGridArray) =>{
  let flag = false;
  let skipIndex = [];
  for(let i = 0; i < 4; i++ ){
    for(let j = 3; j > 0; j-- ){
      const index = i * 4 + j;

      if(leftGridArray[index] === 0) {
        continue;
      }

      if (leftGridArray[index - 1] !== 0 && (leftGridArray[index] !== leftGridArray[index - 1])) {
        flag = leftReс(i, j, leftGridArray, skipIndex, flag);
      }
      const currentGridCell = leftGridArray[index];
      const nextGridCell = leftGridArray[index - 1];
      if(nextGridCell === 0){
        if(skipIndex.includes(index)){
          skipIndex.push(index - 1);
        }
        leftGridArray[index - 1] = currentGridCell;
        leftGridArray[index] = 0;
        flag = true;
      } else if((currentGridCell === nextGridCell) && !skipIndex.includes(index) && !skipIndex.includes(index - 1)){
        leftGridArray[index - 1] = currentGridCell * 2;
        score += currentGridCell * 2;
        leftGridArray[index] = 0;
        skipIndex.push(index - 1);
        flag = true;
      } 
    }
  }
  if(flag) random(leftGridArray);
  if(!flag && !leftGridArray.includes(0)){
    if(isGameOver(leftGridArray)){
      gameOver();
    }
  }
  return(leftGridArray);
}


document.addEventListener('keyup', (event) =>{
  if(event.key == "ArrowDown"){
    gridArray = down(gridArray);
    render(gridArray);
  }
  
  if(event.key == "ArrowRight"){
    gridArray = right(gridArray);
    render(gridArray);
  }

  if(event.key == "ArrowUp"){
    gridArray = up(gridArray);
    render(gridArray);
  }

  if(event.key == "ArrowLeft"){
    gridArray = left(gridArray);
    render(gridArray);
  }

 })

 newGameButton.addEventListener('click', () =>{
  gridArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  gridArray = random(gridArray);
  score = 0;
  render(gridArray);
 })

 document.addEventListener('DOMContentLoaded', () =>{
  gridArray = random(gridArray);
  render(gridArray);
  const bestScoreText = document.querySelector('#best-score-value');
  bestScore = localStorage.getItem('bestScore');
  bestScoreText.innerHTML = bestScore;
 })