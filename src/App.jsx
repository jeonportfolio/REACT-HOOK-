import { useReducer } from "react";
import { useState } from "react";


const intial = {count: 0};

const reducer = (state, action) => {
  switch(action.type){
    case "INCREASE": {
        return {count: state.count + 1};
    } 
    case "DECREASE": {
        return {count: state.count - 1};

    }
    default: {
      throw new Error("invalid type:" + action.type);
    }
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, intial);

  return (
    <div>
        <h1>count: {state.count}</h1>
        <button onClick={() => dispatch({type:"INCREASE"})}>+</button>
        <button onClick={() => dispatch({type:"DECREASE"})}>-</button>
    </div>
  )
}

export default App
