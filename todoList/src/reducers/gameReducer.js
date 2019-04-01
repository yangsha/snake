import React from 'react'

const reducer = (state,action)=>{
   if(action.type==='GAME_START'){
     const x=state.snakeHeadX;
     const y=state.snakeHeadY;
       return (
         state.set('snakeHeadX',x+10).set('snakeHeadY',y+10)
       )
   }else{
     return state
   }
}
export default reducer
