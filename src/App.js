import React, { useState, useEffect } from "react";

import "./App.css";
import logo from "./img/fitx.png";

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
  const [members, setMembers] = useState([
    // {
    //   ime: "Stefan",
    //   prezime: "Kucurski",
    //   viber: "053",
    //   instagram: "john_diamond",
    //   active: false,
    // },
  ]);
  const [jelena, setJelena] = useState("");
  const [status, setStatus] = useState("svi");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [search, setSearch] = useState("");
  //EFFECT
  const fetchFirestoreData = async (params) => {
    const db = firebase.firestore();
    const data = await db.collection("members").get();
    setMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    fetchFirestoreData();
    console.log("Povlacim iz baze", new Date());
  }, [setMembers, jelena]);
  // [form, status, filteredMembers]);
  useEffect(() => {
    filterHandler();
  }, [setMembers, members, search, status]);
  //FUNCTIONS
  const filterHandler = async () => {
    let activeMembers = await members.map((member) => {
      if (member.valid.toDate() > new Date()) {
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
        console.log(filteredMembers);
        break;
      case "neaktivni":
        setFilteredMembers(
          activeMembers.filter((member) => member.active === false)
        );
        console.log(filteredMembers);
        break;
      default:
        setFilteredMembers(activeMembers);
        break;
    }
    if (search.length > 0) {
      console.log("search: " + search);
      setStatus("svi");
      setFilteredMembers(
        activeMembers.filter((member) => {
          return (
            member.ime.toLowerCase().includes(search.toLowerCase()) ||
            member.prezime.toLowerCase().includes(search.toLowerCase()) ||
            member.instagram.toLowerCase().includes(search.toLowerCase()) ||
            member.viber.toLowerCase().includes(search.toLowerCase())
          );
        })
      );
    }
  };
  const resetForm = () => {
    setForm({
      ime: "",
      prezime: "",
      instagram: "",
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
        // loadMembersFromLS={loadMembersFromLS}
        resetForm={resetForm}
        setJelena={setJelena}
      />
      <Search
        members={members}
        setForm={setForm}
        setStatus={setStatus}
        setSearch={setSearch}
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
