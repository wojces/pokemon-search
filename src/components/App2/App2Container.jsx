import React, { useState } from "react";
import SigningView from "./SigningView";
import App2 from "./App2";
import { useReducer, useEffect } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "setToken": {
      return { ...state, token: action.token, isSignIn: action.isSignIn };
    }
    default: {
      return { state };
    }
  }
}

const initialState = { isSignIn: false, token: null };

export default function App2Container() {
  const [state, dispatch] = useReducer(reducer, initialState);

  let tokenData = sessionStorage.getItem("accesToken");

  useEffect(() => {
    if (tokenData !== null) {
      dispatch({ type: "setToken", token: tokenData, isSignIn: true });
    }
  }, [tokenData]);

  return (
    <div>
      {!state.isSignIn && <SigningView />}
      {state.isSignIn && <App2 token={state.token} />}
    </div>
  );
}
