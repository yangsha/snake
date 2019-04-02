import React, {useReducer} from 'react'
import {Record, List} from "immutable";
import gameReducer from '../reducers/gameReducer'
import {Stage, Layer, Circle, Text, Line,Rect} from 'react-konva'
import {goDown,goLeft,goRight, goUp,gameStart} from '../action/Acitons'
import  './Map.css'

export const Balls_Number = 10;
export const wallHeight = 500;
export const wallWidth = 800
const gameRecord = Record({
  balls: [], //用来存储随机生成的球的位子
  nowBalls:Balls_Number,//用来存储现在的还剩余的球的数量
  gameState: 'fail',//游戏状态 success or not
  snakeHeadX: 50,//小蛇的头的位子的横坐标
  snakeHeadY: 50,//小蛇的头的位子的纵坐标
  score:0,//得分
  headDirection:'right',//当前小蛇的方向
  snake:[]//用来存储蛇的头以及身体各个部位的坐标
})

const getInitState = () => {
  let balls = [];
  let pointX=[],pointY=[];
  //console.log(balls.set(0,{x:1,y:2}).get(0))
  for( ;pointX.length< Balls_Number;){
    let point_x= Math.floor(Math.random() * (wallWidth-10));
    let point_y= Math.floor(Math.random()* (wallHeight-10));
    //console.log(pointX.includes(point_x),pointY.includes(point_y))
    if(point_x<=10){point_x+=10}
    if(point_y<=10){point_y+=10}
    if(!(pointX.includes(point_x))&&!(pointY.includes(point_y))){
      pointX.push(point_x)
      pointY.push(point_y)
      balls.push({x:point_x,y:point_y,exist:true})
    }
  }
  const snake = [];
  snake.push({
    x:50,
    y:50
  });
  snake.push(
    {
      x:30,
      y:50
    }
  )
  return (new gameRecord({
    balls:List(balls),
    snake:snake,
  }));
}
const Map = () => {
  const [state, dispatch] = useReducer(gameReducer, getInitState())
  return (<div>
    <div>
      <button className='small_button' onClick={()=>dispatch(goUp(state))}>Up</button>
      <button className='small_button' onClick={()=>dispatch(goDown(state))}>Down</button>
      <button className='small_button' onClick={()=>dispatch(goLeft(state))}>Left</button>
      <button className='small_button' onClick={()=>dispatch(goRight(state))}>Right</button>
      <span className='score'>{'SCORES: '+state.score}</span>
      <button
        className="button"
        onClick={() => dispatch(gameStart(state))}
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
        {
          state.snake.map(
            (text,index) => (
              (text)&&(index>=1)&&<Circle
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
            )
          )
        }
        <Circle
          x={state.snake[0].x}
          y={state.snake[0].y}
          radius={10}
          fill={'green'}
          opacity={0.8}
          rotation={Math.random() * 180}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.6}
        />
        <Circle
          x={state.snake[0].x}
          y={state.snake[0].y}
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





















