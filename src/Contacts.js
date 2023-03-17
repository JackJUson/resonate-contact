import React, { useState, useEffect } from "react";
import { AiOutlineUser, AiOutlineHome, AiOutlinePhone } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { VscOrganization } from "react-icons/vsc";

import axios from "axios";
import "./styles.css";

function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const initialNumberOfContacts = 6;
  const [numOfResults, setNumOfResults] = useState(initialNumberOfContacts);

  async function fetchContacts() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setContacts(data);
  }

  function loadMore() {
    setNumOfResults(numOfResults + 3);
  }

  function loadLess() {
    setNumOfResults(initialNumberOfContacts);
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Contacts List</h1>
      <div className="row">
        {contacts.slice(0, numOfResults).map((contact) => (
          <div className="contact__container" key={contact.id}>
            <div className="icon__container">
              <AiOutlineUser className="user" size={40} />
              <a href={contact.website} target="_blank">
                <FiExternalLink className="link" size={25} />
              </a>
            </div>
            <strong className="name">{contact.name}</strong>
            <div className="contact__detail">
              <HiOutlineMail className="icon" size={25} /> {contact.email}
            </div>
            <div className="contact__detail">
              <AiOutlineHome className="icon" size={25} />{" "}
              {contact.address.street} {contact.address.suite}{" "}
              {contact.address.city}
            </div>
            <div className="contact__detail">
              <AiOutlinePhone className="icon" size={25} /> {contact.phone}
            </div>
            <div className="contact__detail">
              <VscOrganization className="icon" size={25} />{" "}
              {contact.company.name}
            </div>
          </div>
        ))}
      </div>
      <div className="button__container">
        {numOfResults < contacts.length && (
          <button className="button" onClick={() => loadMore()}>
            Show more
          </button>
        )}
        {numOfResults > contacts.length && (
          <button className="button" onClick={() => loadLess()}>
            Show less
          </button>
        )}
      </div>
    </div>
  );
}

export default ContactsList;
