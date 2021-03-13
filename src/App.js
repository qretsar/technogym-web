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
    {
      ime: "Stefan",
      prezime: "Kucurski",
      viber: "053",
      instagram: "john_diamond",
      active: false,
    },
  ]);
  const [status, setStatus] = useState("svi");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [search, setSearch] = useState("");
  //EFFECT
  useEffect(() => {
    let tempMember = [
      {
        ime: "Lana",
        prezime: "Kucurski",
        instagram: "lanaban",
        viber: "394349",
        uplata: "45",
        datum: "13-03-2021",
        valid: "13-07-2020",
        id: 1000.2788200979525,
        active: false,
      },
    ];
    if (localStorage.members === undefined) {
      localStorage.setItem("members", JSON.stringify(tempMember));
    }
    setMembers(JSON.parse(localStorage.getItem("members")));
    // console.log(JSON.parse(localStorage.members));
  }, [localStorage.members]);
  useEffect(() => {
    // saveLocalTodos();
    filterHandler();
    console.log(search);
  }, [members, search, status]);
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

  return (
    <div className="container my-5">
      <div className="header">
        <img src={logo} class="img-fluid" alt="Responsive image" />
        <p>Fitness Studio</p>
      </div>

      <Form
        form={form}
        setForm={setForm}
        members={members}
        setMembers={setMembers}
      />
      <Search
        members={members}
        setForm={setForm}
        setStatus={setStatus}
        setSearch={setSearch}
      />
      <MemberList
        filteredMembers={filteredMembers}
        setMembers={setMembers}
        setForm={setForm}
        setSearch={setSearch}
      />
    </div>
  );
}

export default App;
