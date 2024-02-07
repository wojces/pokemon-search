import { useReducer } from "react";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "enteredEmail": {
      return { ...state, enteredEmail: action.enteredEmail };
    }
    case "enteredPassword": {
      return { ...state, enteredPassword: action.enteredPassword };
    }
    default: {
      return state;
    }
  }
}

const initialState = {
  enteredEmail: "168111",
  enteredPassword: "",
};

export default function SigningView() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmit(e) {
    e.preventDefault();
    const res = renderEmailValidationResult();

    if (res === "Email is valid") {
      alert(
        "Wprowadzony email: " +
          state.enteredEmail +
          "\n" +
          "Wprowadzone hasło: " +
          state.enteredPassword
      );
      const payload = {
        username: state.enteredEmail,
        password: state.password ? state.password : "",
      };

      function postData() {
        axios({
          url: "https://live.e-orzecznik.pl/resource/api/signin",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: payload,
        })
          .then((res) => {
            sessionStorage.setItem("accesToken", res.data.access_token);
            location.reload();
          })
          .catch((err) => console.log(err));
      }
      postData();
    }
  }

  function renderEmailValidationResult() {
    let msg = "";

    const rgExp =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (state.enteredEmail === "168111" || rgExp.test(state.enteredEmail)) {
      msg = "Email is valid";
    } else if (state.enteredEmail === "") {
      msg = "Please enter email";
    } else if (!rgExp.test(state.enteredEmail)) {
      msg = "Email is not valid";
    } else {
      msg = "";
    }

    return msg;
  }

  return (
    <div className="container">
      <h1 className="mt-4 text-center">Sign In View</h1>
      <form
        onSubmit={handleSubmit}
        className="signin-card mt-4 p-4 border rounded"
        noValidate>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={state.enteredEmail}
              onChange={(e) =>
                dispatch({
                  type: "enteredEmail",
                  enteredEmail: e.target.value,
                })
              }
            />
            <div>{renderEmailValidationResult()}</div>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              value={state.enteredPassword}
              onChange={(e) =>
                dispatch({
                  type: "enteredPassword",
                  enteredPassword: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="row ">
          <div className="col-sm d-flex justify-content-center">
            <button type="submit" className="btn btn-secondary">
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
