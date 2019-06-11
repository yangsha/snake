import React, {useReducer,useEffect} from 'react'
import {Record, List} from "immutable";
import gameReducer from '../reducers/gameReducer'
import {Stage, Layer, Circle, Text, Line,Rect} from 'react-konva'
import {goDown,goLeft,goRight, goUp,gameStart,modeChoose,move,changeDir} from '../action/Acitons'
import {EasyMap} from './EasyMap'
import  './Map.css'

export const Balls_Number = 10;
export const wallHeight = 500;
export const wallWidth = 800
const ROW = 30 //行数
const COL =25  //列数
const gameRecord = Record({
   gameState:'Game Start',//"Gaming...","ChooseMode"
   score:0,//得分
   mode:' ',//游戏难度模式
   modeList:["Easy","Medium","Hard"],//游戏难度模式列表
   modeChoose:false,//是否已经选择对应模式
   snakeHead:[20,90], //蛇头的位置坐标，蛇默认为正方形，
   direction:'right',//up,down,left,表示此时蛇移动的方向
   snake:[],//表示蛇的全体部位的坐标
   length:2,//蛇身的长度
})
const getInitState =()=>{
  let snakeHead = [20,200]
  let snakeHeadNext = [0,200]
  let snake = []
  snake.push(snakeHead)
  snake.push(snakeHeadNext)
  return new gameRecord({
    snake:snake,
    snakeHead:snakeHead
  })
}
const Map = () => {
  useEffect(()=>{
    document.addEventListener('keydown', changeDirection)
  })
  const [state, dispatch] = useReducer(gameReducer, getInitState())
  const startGame = (state,text)=>{
    dispatch(gameStart(state,text))
    //实现蛇的自由移动
    setInterval(()=>dispatch(move(state)),200)
  }
  function changeDirection(e){
    e.preventDefault()
    if(e.keyCode===37){
      dispatch(changeDir(state,"left"))
    }else if(e.keyCode===38){
      dispatch(changeDir(state,"up"))
    }else if(e.keyCode===39){
      dispatch(changeDir(state,"right"))
    }else if(e.keyCode===40){
      dispatch(changeDir(state,"down"))
    }
  }
  return (<div>
    <div onKeyDown={changeDirection}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer >
          <Rect
            x={0} y={0} width={600} height={50} fill="#6B9FA1"
          />
           <Rect
           x={0} y={50} width={600} height={500} fill="#9dacaf"
           />
          {
            state.modeChoose&&state.modeList.map((text, index) =>
              <Rect key={index} x={200} y={index*60+200} width={200} height={40} fill= "#6B9FA1"
                    onClick={()=>startGame(state,text)}
              />
              )
          }
          {
            state.modeChoose&&state.modeList.map((text, index) =>
              <Text key={index} x={200+50} y={index*60+200+10} text={text} fill= "black" fontSize={20}
                    // onClick={()=>dispatch(gameStart(state,text))}
              >
              </Text>
            )
          }
          {
            state.snake.map((text,index)=>(
              <Rect key={index} x={text[0]} y={text[1]} width={20} height={20} fill="#5AAF15"/>
            ))
          }
           {/*state.mode==="easy"&&<EasyMap/>*/}
           {/*state.mode==="medium"&&<MediumMap/>*/}
           {/*state.mode==="hard"&&<HardMap/>*/}
           <Text x={50} y={20} text="A Smart Snake" fontFamily={'Calibri'} fill="black" fontSize={20}/>
           <Text x={400} y={20} text={"Score: "+state.score} fontFamily={'Calibri'} fill="black" fontSize={20} />
           <Rect x={0} y={550} width={600} height={50} fill="#6B9FA1"/>
           <Rect x={220} y={560} width={150} height={30} fill="#9DACAF"/>
           <Text x={260} y={565} text={state.gameState} fill="black" fontSize={15} onClick={()=>dispatch(modeChoose(state))}/>
        </Layer>
      </Stage>
   </div>
  </div>)
}
export default Map





















