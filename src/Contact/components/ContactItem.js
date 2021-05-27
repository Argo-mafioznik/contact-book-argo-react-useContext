import React, { useContext } from "react";
import { contactContext } from "../../ContactContext";
import cancelImg from "../assets/icons/cancel.svg";
import editImg from "../assets/icons/edit.svg";
import classes from "../contact.module.css";

export default function ContactItem(props) {
  const { fullName, phoneNumber, email, id } = props.data;

  const { deleteContact, changeEditId } = useContext(contactContext);

  const handleDelete = () => {
    deleteContact(id);
  };

  return (
    <div className={classes.inf}>
      <li>
        <p>
          Full Name:
          <hr />
          <br />
          {fullName}
        </p>
        <p>
          Phone Number:
          <hr />
          <br />
          {phoneNumber}
        </p>
        <p>
          Email:
          <hr />
          <br />
          {email}
        </p>
        <img
          className={classes.cancelIcon}
          src={cancelImg}
          onClick={() => handleDelete(id)}
          alt="cancel-img"
        />
        <img
          onClick={() => changeEditId(id)}
          className={classes.editIcon}
          src={editImg}
          alt="edit-img"
        />
      </li>
      <hr style={{ marginBottom: "30px" }} />
    </div>
  );
}
