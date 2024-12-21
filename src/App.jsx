import { useEffect, useReducer, useRef } from "react";
import { useState } from "react";
import { MyComponent, MyProvider } from "./MyComponent";
import { ThemeComponent, ThemeProvider } from "./Theme";


const intial = {count: 0};

function Update(props) {
  const [state, setState] = useState(0);
  useEffect(() => {
    console.log("update", state)
  }, [state]);
  return (
    <div>
      <h1>state: {state}</h1>
      <button onClick={() => setState((pre) => pre + 1)}>Click</button>
    </div>
  )
}

function CleanUp() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((pre) => pre + 1);
    },1000);
    return () => {
      console.log('clean')
      clearInterval(timerId)
    };
  }, []);
  return <div>Seconds: {seconds}</div>
}


function Basic() {
  useEffect(() => {
    console.log("mount");
  },[])
  return <div>Hello</div>
}


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


function FocusInput() {
  const inputRef = useRef(null);
  
  const handleClick = () => {
    inputRef.current.focus();
  }
  return (
    <div>
      <input type="text" ref={inputRef}/>
      <button onClick={handleClick}>Focus</button>
    </div>
  );
}

function App() {
  const [isShow, setIsShow] = useState(false);
  const[seconds, setSeconds] = useState(0);
  const timeRef = useRef(null);

  const handleStart = () => {
   if(timeRef.current) return;
   timeRef.current = setInterval(() => {
        setSeconds((pre) => pre + 1); 
    },1000)
  }
  const handleEnd = () => {
    clearInterval(timeRef.current);
    timeRef.current=null;
  }

  const [state, dispatch] = useReducer(reducer, intial);

  return (
    <div>
        {isShow && <CleanUp/>}
        <button onClick={() => setIsShow((pre) => !pre)}>clean</button>
        <Update/>
        <Basic/>
        <h1>Timer: {seconds}</h1>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleEnd}>End</button>
        <FocusInput/>
        <h1>count: {state.count}</h1>
        <button onClick={() => dispatch({type:"INCREASE"})}>+</button>
        <button onClick={() => dispatch({type:"DECREASE"})}>-</button>
        <MyProvider>
          <MyComponent/>
        </MyProvider>
        <ThemeProvider>
          <ThemeComponent/>
        </ThemeProvider>
    </div>
  )
}




export default App
