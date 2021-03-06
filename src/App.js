import React, { useState, useEffect } from "react";

import "./App.css";
import logo from "./img/logo.svg";

//Importing Components
import Form from "./container/Form";
import Search from "./container/Search";
import MemberList from "./components/MemberList";
import firebase from "./firebase";

////
function App() {
  //STATES
  const [form, setForm] = useState({
    ime: "",
    prezime: "",
    instagram: "",
    viber: "",
    datum: "",
    uplata: "",
    active: "",
  });
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState("svi");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [search, setSearch] = useState("");
  //EFFECT
  const fetchFirestoreData = async (params) => {
    const db = firebase.firestore();
    const data = await db.collection("membersA").get();
    let tempMembers = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      expirationDate: doc.data().expirationDate.toDate(),
    }));
    tempMembers.sort((a, b) =>
      a.expirationDate > b.expirationDate
        ? -1
        : b.expirationDate > a.expirationDate
        ? 1
        : 0
    );
    setMembers(tempMembers);
  };
  useEffect(() => {
    fetchFirestoreData();
  }, []);
  // function process(date) {
  //   return format(date, "MM-dd-yy");
  // }
  // Members filtering function in useEffect
  useEffect(() => {
    let activeMembers = members.map((member) => {
      if (
        member.expirationDate.setHours(0, 0, 0, 0) >
        new Date().setHours(0, 0, 0, 0)
      ) {
        return {
          ...member,
          active: true,
        };
      } else {
        return {
          ...member,
          active: false,
        };
      }
    });
    switch (status) {
      case "aktivni":
        setFilteredMembers(
          activeMembers.filter((member) => member.active === true)
        );
        break;
      case "neaktivni":
        setFilteredMembers(
          activeMembers.filter((member) => member.active === false)
        );
        break;
      default:
        setFilteredMembers(activeMembers);
        break;
    }
    if (search.length > 0) {
      setStatus("svi");
      setFilteredMembers(
        activeMembers.filter((member) => {
          return (
            member.ime.toLowerCase().includes(search.toLowerCase()) ||
            member.prezime.toLowerCase().includes(search.toLowerCase()) ||
            member.viber.toLowerCase().includes(search.toLowerCase())
          );
        })
      );
    }
  }, [setMembers, members, search, status]);
  //FUNCTIONS
  const resetForm = () => {
    setForm({
      ime: "",
      prezime: "",
      // instagram: "",
      viber: "",
      datum: "",
      uplata: "0",
      active: "",
    });
  };

  return (
    <div className="container my-5">
      <div className="header">
        <img src={logo} className="img-fluid" alt="Responsive" />
        <p>Fitness Studio</p>
      </div>

      <Form
        form={form}
        setForm={setForm}
        members={members}
        setMembers={setMembers}
        resetForm={resetForm}
      />
      <Search
        members={members}
        setForm={setForm}
        setStatus={setStatus}
        setSearch={setSearch}
        filteredMembers={filteredMembers}
      />
      <MemberList
        filteredMembers={filteredMembers}
        members={members}
        setMembers={setMembers}
        setForm={setForm}
        setSearch={setSearch}
        resetForm={resetForm}
      />
    </div>
  );
}

export default App;
