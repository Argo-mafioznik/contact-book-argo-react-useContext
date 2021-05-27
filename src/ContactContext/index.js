import axios from "axios";
import React, { useReducer } from "react";

const INIT_STATE = {
  contactList: [],
  editContactId: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_CONTACT_LIST":
      return {
        ...state,
        contactList: action.payload,
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contactList: [...state.contactList, action.payload],
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contactList: state.contactList.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    case "CHANGE_EDIT_ID":
      return {
        ...state,
        editContactId: action.payload,
      };
    case "EDITING_CONTACT":
      return {
        ...state,
        contactList: state.contactList.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    default:
      return state;
  }
};

export const contactContext = React.createContext();

const URL = "http://localhost:8001";

export default function ContactContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const fetchContacts = async () => {
    const response = await axios.get(`${URL}/contacts`);
    console.log("server-data: ", response.data);

    const contacts = response.data;

    dispatch({
      type: "SET_CONTACT_LIST",
      payload: contacts,
    });
  };

  const createContact = async (contact) => {
    const { data } = await axios.post(`${URL}/contacts`, contact);

    dispatch({
      type: "ADD_CONTACT",
      payload: data,
    });
  };

  const deleteContact = async (id) => {
    await axios.delete(`${URL}/contacts/${id}`);

    dispatch({
      type: "DELETE_CONTACT",
      payload: id,
    });
  };

  const changeEditId = (id) => {
    dispatch({
      type: "CHANGE_EDIT_ID",
      payload: id,
    });
  };

  const changeContact = async (id, fullName, phoneNumber, email) => {
    const { data } = await axios.patch(`${URL}/contacts/${id}`, {
      fullName,
      phoneNumber,
      email,
    });

    dispatch({
      type: "EDITING_CONTACT",
      payload: data,
    });

    changeEditId("");
  };

  return (
    <contactContext.Provider
      value={{
        contactList: state.contactList,
        editId: state.editContactId,
        fetchContacts,
        createContact,
        deleteContact,
        changeEditId,
        changeContact,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
}
