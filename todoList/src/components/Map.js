import React, {useReducer} from 'react'
import {Record} from "immutable";
import gameReducer from '../reducers/gameReducer'
import {Stage, Layer, Star, Text} from 'react-konva'

const gameRecord = Record({
  balls: 25,
  nowBalls: 25,
  gameState: 'fail'
})
const getInitState = () => {
  const initState = new gameRecord();
  return initState
}
const Map = () => {
  const [state, dispatch] = useReducer(gameReducer, getInitState())

  return (<div>
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Try to drag a star" />
        {[...Array(10)].map(i => (
          <Star
            key={i}
            x={Math.random() * window.innerWidth}
            y={Math.random() * window.innerHeight}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            fill="#89b717"
            opacity={0.8}
            draggable
            rotation={Math.random() * 180}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
          />
        ))}
      </Layer>
    </Stage>
  </div>)
}
export default Map





















