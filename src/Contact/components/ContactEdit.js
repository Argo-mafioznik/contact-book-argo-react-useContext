import classes from "../contact.module.css";
import React, { useContext, useState } from "react";
import { contactContext } from "../../ContactContext";

export default function ContactEdit(props) {
  const {
    fullName: contactFullName,
    phoneNumber: contactPhoneNumber,
    email: contactEmail,
    id,
  } = props.data;

  const [fullName, setFullName] = useState(contactFullName);
  const [phoneNumber, setPhoneNumber] = useState(contactPhoneNumber);
  const [email, setEmail] = useState(contactEmail);

  const { changeContact } = useContext(contactContext);

  const handleEdit = (e) => {
    e.preventDefault();
    changeContact(id, fullName, phoneNumber, email);
  };

  return (
    <li className={classes.editingContact}>
      <form onSubmit={handleEdit}>
        <h1 className={classes.editing_h1}>Editing</h1>
        <input
          onChange={(e) => setFullName(e.target.value)}
          type="text"
          name="fullName"
          required
          value={fullName}
        />
        <input
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="number"
          name="phoneNumber"
          required
          value={phoneNumber}
        />{" "}
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          required
          value={email}
        />
        <button>Edit</button>
      </form>
    </li>
  );
}
