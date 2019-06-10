import React from 'react'
import {wallHeight,wallWidth} from '../components/Map'
////不足：在balls和snake的存储都采用了数组的形式 ，没有采用immutable,对数据进行了原地修改，需改进！！
///并且为了形成小蛇的动态效果  采用了数组的原地修改形式
///将像素点坐标改成坐标的形式
function walkTo(snake,direction) {
  const x=snake[0].x;
  const y=snake[0].y;
  for(let i=snake.length-1;i>=1;i--) {
    snake[i] = snake[i - 1]
  }
  switch(direction){
    case 'right':
      snake[0]={
        x:x+20,
        y:y
      };
      break;
    case 'left':
      snake[0]={
        x:x-20,
        y:y
      }
      break;
    case 'up':
      snake[0]={
        x:x,
        y:y-20
      }
      break;
    case 'down':
      snake[0]={
        x:x,
        y:y+20
      }
      break;
    default:snake[0]=snake[0];
  }
  return snake;
}
// function move(snake) {
//   const x = snake[0].x;
//   const y = snake[0].y;
//   for(let i=snake.length-1;i>=1;i--) {
//     snake[i] = snake[i - 1]
//   }
//   snake[0]={
//     x:x+20,
//     y:y
//   }
// }
const reducer = (state,action)=>{

  if(action.type==='GAME_START'){
    console.log(action.text)
    return (state.set('gameState'," Gaming...").set('mode',action.text).set('modeChoose',false))
  } else if(action.type==='MODE_CHOOSE'){
    return state.set('modeChoose',true)
  } else if(action.type==='GO_RIGHT'){
       const snake = walkTo(state.snake,'right');
       return (
         state.set('snake',snake).set('snakeHeadX',snake[0].x).set('score',score)
       )
   }else if(action.type==='GO_LEFT'){
    const snake = walkTo(state.snake,'left');
    return (
      state.set('snake',snake).set('snakeHeadX',snake[0].x).set('score',score)
    )
   }else if(action.type==='GO_UP'){
    const snake = walkTo(state.snake,'up')
    return (
      state.set('snake',snake).set('snakeHeadY',snake[0].y).set('score',score)
    )
   }else if(action.type==='GO_DOWN'){
    const snake = walkTo(state.snake,'down')
    return (
      state.set('snake',snake).set('snakeHeadY',snake[0].y).set('score',score)
    )
   } else{
     return state
   }
}
export default reducer

