import React, { createContext, useContext, useReducer } from "react";
import ReactDOM from "react-dom";

const Context = createContext();

const A = () => {
  const { dispatch, state } = useContext(Context);
  return (
    <>
      <button
        disabled={state.loading}
        onClick={() => {
          dispatch({
            type: "click_async",
            payload: asyncFetch(new Date().getTime())
          });
        }}
      >
        click async
      </button>
      <button
        disabled={state.loading}
        onClick={() => {
          dispatch({
            type: "click_sync",
            payload: new Date().getTime()
          });
        }}
      >
        click sync
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case "click_async":
    case "click_sync":
      return { ...state, value: action.payload };
    case "loading_start":
      return { ...state, loading: true };
    case "loading_end":
      return { ...state, loading: false };
    default:
      throw new Error();
  }
}

function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

async function asyncFetch(p) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(p);
    }, 1000);
  });
}

function wrapperDispatch(dispatch) {
  return function(action) {
    if (isPromise(action.payload)) {
      dispatch({ type: "loading_start" });
      action.payload.then(v => {
        dispatch({ type: action.type, payload: v });
        dispatch({ type: "loading_end" });
      });
    } else {
      dispatch(action);
    }
  };
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, { value: 0, loading: false });
  return (
    <>
      <Context.Provider value={{ state, dispatch: wrapperDispatch(dispatch) }}>
        <A />
      </Context.Provider>
    </>
  );
}
