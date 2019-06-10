import React, {useReducer} from 'react'
import {Record, List} from "immutable";
import gameReducer from '../reducers/gameReducer'
import {Stage, Layer, Circle, Text, Line,Rect} from 'react-konva'
import {goDown,goLeft,goRight, goUp,gameStart,modeChoose} from '../action/Acitons'
import  './Map.css'

export const Balls_Number = 10;
export const wallHeight = 500;
export const wallWidth = 800
const ROW = 30 //行数
const COL =25  //列数
const gameRecord = Record({
   gameState:'Game Start',//"Gaming...","ChooseMode"
   score:0,
   mode:'easy',
   modeList:["Easy","Medium","Hard"],
   modeChoose:false
})
const getInitState =()=>{
  return new gameRecord
}
const Map = () => {
  const [state, dispatch] = useReducer(gameReducer, getInitState())
   return (<div>
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Rect
            x={0} y={0} width={600} height={50} fill="#6B9FA1"
          />
           <Rect
           x={0} y={50} width={600} height={500} fill="#9dacaf"
           />
          {
            state.modeChoose&&state.modeList.map((text, index) =>
              <Rect key={index} x={200} y={index*60+200} width={200} height={40} fill= "#6B9FA1"
                    onClick={()=>dispatch(gameStart(state,text))}
              />
              )
          }
          {
            state.modeChoose&&state.modeList.map((text, index) =>
              <Text key={index} x={200+50} y={index*60+200+10} text={text} fill= "black" fontSize={20}
              >
              </Text>
            )
          }
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





















