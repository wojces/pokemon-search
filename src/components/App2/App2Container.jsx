import { useState, useEffect } from "react";
import SigningView from "./SigningView";
import App2 from "./App2";
import { setToken } from "../../features/app2/app2Slice";
import { useDispatch } from "react-redux";

export default function App2Container() {
  const dispatch = useDispatch();
  const [signIn, setSignIn] = useState(false);

  let tokenData = sessionStorage.getItem("accesToken");

  useEffect(() => {
    if (tokenData !== null) {
      dispatch(setToken(tokenData));
      setSignIn(true);
    }
  }, [tokenData]);

  return (
    <div>
      {!signIn && <SigningView />}
      {signIn && <App2 />}
    </div>
  );
}
