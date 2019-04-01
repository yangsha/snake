import React, {useReducer} from 'react'
import {Record, List} from "immutable";
import gameReducer from '../reducers/gameReducer'
import {Stage, Layer, Circle, Text, Line,Rect} from 'react-konva'
import {gameStart} from '../action/Acitons'
import  './Map.css'

const Balls_Number = 10;
const wallHeight = 500;
const wallWidth = 800
const gameRecord = Record({
  balls: [],
  nowBalls:Balls_Number,
  gameState: 'fail',
  snakeHeadX: 50,
  snakeHeadY: 50,
  score:0
})
const getInitState = () => {
  let balls = [];
  let pointX=[],pointY=[];
  //console.log(balls.set(0,{x:1,y:2}).get(0))
  for( ;pointX.length< Balls_Number;){
    let point_x= Math.floor(Math.random() * wallWidth);
    let point_y= Math.floor(Math.random()* wallHeight);
    //console.log(pointX.includes(point_x),pointY.includes(point_y))
    if(!(pointX.includes(point_x))&&!(pointY.includes(point_y))){
      pointX.push(point_x)
      pointY.push(point_y)
      balls.push({x:point_x,y:point_y,exist:true})
    }
  }
  return (new gameRecord({balls:List(balls)}));
}

const Map = () => {
  const [state, dispatch] = useReducer(gameReducer, getInitState())
  return (<div>
    <div>
      <button className='small_button'>Up</button>
      <button className='small_button'>Down</button>
      <button className='small_button'>Left</button>
      <button className='small_button' onClick={()=>dispatch(gameStart(state))}>Right</button>
      <span className='score'>{'SCORES: '+state.score}</span>
      <button
        className="button"
      >GameStart
      </button>
    </div>
    <div>
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
         x={0}
         y={0}
         width={wallWidth}
         height={wallHeight}
         fill="#9DACAF"
        />
        {/*<Text text="The snake is coming"/>*/}
        <Circle
          x={state.snakeHeadX}
          y={state.snakeHeadY}
          radius={10}
          fill={'green'}
        />
        <Circle
          x={state.snakeHeadX}
          y={state.snakeHeadY}
          radius={2}
          fill={'black'}
        />

        {state.balls.map((text, index) => (
          (text.exist === true) && <Circle
            key={index}
            x={text.x}
            y={text.y}
            radius={10}
            fill="#89b717"
            opacity={0.8}
            rotation={Math.random() * 180}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
          />
        ))}
      </Layer>
    </Stage>
    </div>
  </div>)
}
export default Map





















