import React from 'react'


export const gameStart = (state,text) =>{
  return({
    type:'GAME_START',
    text:text,
    state
  })
}
export const goRight = (state) =>{
   return({
     type:'GO_RIGHT',
     state
   })
}
export const goLeft = state =>{
  return({
    type:'GO_LEFT',
    state
  })
}
export const goUp = state =>{
  return({
    type:'GO_UP',
    state
  })
}
export const goDown = state =>{
  return({
    type:'GO_DOWN',
    state
  })
}
export const modeChoose = state=>{
  return ({
    type:"MODE_CHOOSE",
    state
  })
}

