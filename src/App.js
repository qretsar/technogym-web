import React, { useState, useEffect } from "react";

import "./App.css";
import logo from "./img/fitx.png";
import { format, parse } from "date-fns";
//Importing Components
import Form from "./container/Form";
import Search from "./container/Search";
import MemberList from "./components/MemberList";

////
function App() {
  //STATES
  const [form, setForm] = useState({
    ime: "",
    prezime: "",
    instagram: "",
    viber: "",
    datum: "",
    uplata: "0",
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
  const [status, setStatus] = useState("svi");
  const [filteredMembers, setFilteredMembers] = useState([]);
  //EFFECT
  useEffect(() => {
    setMembers(JSON.parse(localStorage.getItem("members")));
    // console.log(JSON.parse(localStorage.members));
  }, [localStorage.members]);
  useEffect(() => {
    // saveLocalTodos();
    filterHandler();
  }, [members, status]);
  //FUNCTIONS

  const filterHandler = () => {
    let activeMembers = members.map((member) => {
      let validToCompare = parse(member.valid, "dd-MM-yyyy", new Date());
      if (validToCompare > new Date()) {
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
  };

  return (
    <div className="container my-5">
      <img src={logo} class="img-fluid" alt="Responsive image" />
      <p>Fitness Studio FitX</p>
      <Form
        form={form}
        setForm={setForm}
        members={members}
        setMembers={setMembers}
      />
      <Search members={members} setForm={setForm} setStatus={setStatus} />
      <MemberList
        filteredMembers={filteredMembers}
        setMembers={setMembers}
        setForm={setForm}
      />
    </div>
  );
}

export default App;
