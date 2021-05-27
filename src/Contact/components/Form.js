import React, { useContext, useState } from "react";
import classes from "../contact.module.css";
import notebook from "../assets/icons/notebook.png";
import { contactContext } from "../../ContactContext";

export default function Form() {
  const { createContact } = useContext(contactContext);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      fullName,
      phoneNumber,
      email,
    };

    createContact(data);

    setFullName("");
    setPhoneNumber("");
    setEmail("");
  };

  return (
    <div className={classes.formWrapper}>
      <div>
        <h3>
          Contact Book
          <img src={notebook} />
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          name="fullName"
          type="text"
          required
          value={fullName}
        />
        <input
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          name="phoneNumber"
          type="number"
          required
          value={phoneNumber}
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          name="email"
          type="email"
          required
          value={email}
        />
        <button>Create</button>
      </form>
    </div>
  );
}
