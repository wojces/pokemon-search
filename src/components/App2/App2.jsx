import { useEffect, useReducer } from "react";
import axios from "axios";
import { Organization } from "../../model/organization";
import dayjs from "dayjs";
import App2Modal from "./App2Modal";

function reducer(state, action) {
  switch (action.type) {
    case "fetchDataOrganizations": {
      return { ...state, dataOrganizations: action.dataOrganizations };
    }
    case "fetchLocalOrganizations": {
      return { ...state, localOrganizations: action.localOrg };
    }
    case "setModalVisible": {
      return { ...state, modalIsVisible: action.modal };
    }
    default: {
      return state;
    }
  }
}

const initialState = {
  localOrganizations: [],
  dataOrganizations: [],
  modalIsVisible: false,
};

export default function App2({ token }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // dayjs
  var now = dayjs().format("DD/MM/YYYY");

  useEffect(() => {
    getDataOrganizations();
    getLocalOrganizations();
  }, []);

  function getLocalOrganizations() {
    let localOrgList = [];
    const formatedLocalStorage = JSON.parse(JSON.stringify(localStorage));
    Object.keys(formatedLocalStorage).forEach((key) => {
      let newOrganization = localStorage.getItem(key);
      localOrgList.push(JSON.parse(newOrganization));
      localOrgList.sort((a, b) => b.id_organization - a.id_organization);
      dispatch({
        type: "fetchLocalOrganizations",
        localOrg: localOrgList,
      });
    });
  }

  function getDataOrganizations() {
    axios({
      url: "https://live.e-orzecznik.pl/resource/api/organizations",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch({
          type: "fetchDataOrganizations",
          dataOrganizations: res.data.content,
        });
      })
      .catch((err) => console.log(err));
  }

  function lastId() {
    const lastId = state.localOrganizations
      .concat(state.dataOrganizations)
      .reduce((id, org) => {
        return Math.max(id, org.id_organization);
      }, 0);
    return lastId;
  }
  const lastIdOrg = lastId();

  const tableRow = state.localOrganizations
    .concat(state.dataOrganizations)
    .map((org, index) => {
      const organization = new Organization(org);
      return (
        <tr key={organization.idOrganization}>
          <th scope="row">{index + 1}</th>
          <td>{organization.name}</td>
          <td>{organization.city}</td>
          <td>{organization.nip}</td>
          <td>{organization.idOrganization}</td>
          <td>{organization.storage ? organization.storage : "data"}</td>
        </tr>
      );
    });

  return (
    <div className="container">
      <App2Modal
        lastId={lastIdOrg}
        modalIsVisible={state.modalIsVisible}
        closeModal={() => dispatch({ type: "setModalVisible", modal: false })}
      />
      <h1 className="mt-4 text-center">Organizations List</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">City</th>
            <th scope="col">NIP</th>
            <th scope="col">Id</th>
            <th scope="col">Stored</th>
          </tr>
        </thead>
        <tbody>{tableRow}</tbody>
      </table>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-secondary"
          onClick={() => dispatch({ type: "setModalVisible", modal: true })}>
          Add organization
        </button>
      </div>
    </div>
  );
}
