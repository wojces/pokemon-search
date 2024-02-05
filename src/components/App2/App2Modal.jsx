import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "setName": {
      return { ...state, name: action.name };
    }
    case "setCity": {
      return { ...state, city: action.city };
    }
    case "setNip": {
      return { ...state, nip: action.nip };
    }
    case "clearState": {
      return {
        ...state,
        name: action.name,
        city: action.city,
        nip: action.nip,
      };
    }
    case "setMsg": {
      return { ...state, msg: action.msg };
    }
    default: {
      return state;
    }
  }
}

const initialState = {
  id: null,
  name: "",
  city: "",
  nip: "",
  contractUpTo: "",
  msg: "Fill in name and city, nip is optional.",
};

export default function App2Modal({ modalIsVisible, closeModal, lastId }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  let res = false;
  let nipIsValid = true;

  function nipValidation() {
    if (state.nip.length != 10 && state.nip.length != 0) {
      nipIsValid = false;
    }
    for (let i = 0; i < state.nip.length; i++) {
      if (!/^\d$/.test(state.nip[i])) {
        nipIsValid = false;
      }
    }
  }

  function inputCheck() {
    if (state.name === "" || state.city === "") {
      dispatch({ type: "setMsg", msg: "Name or city is missing..." });
      res = false;
    } else if (!nipIsValid) {
      dispatch({
        type: "setMsg",
        msg: "Nip consists of 10 digits without letters and characters...",
      });
      res = false;
    } else if (state.name !== "" && state.city !== "") {
      dispatch({ type: "setMsg", msg: "Correct" });
      res = true;
    }
  }

  function addOrganization() {
    const organization = {
      id_organization: lastId + 1,
      name: state.name,
      city: state.city,
      nip: state.nip,
      contract_up_to: "",
      storage: "local",
    };
    console.log(
      "Added: " +
        organization.name +
        " with id: " +
        organization.id_organization
    );
    localStorage.setItem(
      "localOrganization" + organization.id_organization,
      JSON.stringify(organization)
    );
    location.reload();
  }

  return (
    <>
      <Modal show={modalIsVisible} onHide={() => closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Add new organization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Enter name
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={state.name}
              onChange={(e) =>
                dispatch({ type: "setName", name: e.target.value })
              }
            />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Enter city
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={state.city}
              onChange={(e) =>
                dispatch({ type: "setCity", city: e.target.value })
              }
            />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Enter NIP
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={state.nip}
              onChange={(e) =>
                dispatch({ type: "setNip", nip: e.target.value })
              }
            />
          </div>
          <div className="text-center">{state.msg}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              nipValidation();
              inputCheck();
              if (!res) return;
              addOrganization();
              closeModal();
              dispatch({ type: "clearState", name: "", city: "", nip: "" });
            }}>
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              dispatch({ type: "clearState", name: "", city: "", nip: "" })
            }>
            Clear
          </Button>
          <Button variant="secondary" onClick={() => closeModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// dlaczego p wyswietlajacy msg sie nie aktualizuje w modalu mimo że w consoli smiga
