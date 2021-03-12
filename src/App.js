import React, { useState, useEffect } from "react";
import "./App.css";
//Importing Components
import Form from "./container/Form";
import Search from "./container/Search";
import MemberList from "./components/MemberList";

////
function App() {
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
    {
      ime: "Stefan",
      prezime: "Kucurski",
      viber: "053",
      active: false,
    },
  ]);
  const [status, setStatus] = useState("svi");
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    setMembers(JSON.parse(localStorage.getItem("members")));
    // console.log(JSON.parse(localStorage.members));
  }, [localStorage.members]);
  useEffect(() => {
    // saveLocalTodos();
    filterHandler();
  }, [members, status]);
  const filterHandler = () => {
    switch (status) {
      case "aktivni":
        setFilteredMembers(members.filter((member) => member.active === true));
        break;
      case "neaktivni":
        setFilteredMembers(members.filter((member) => member.active === false));
      default:
        setFilteredMembers(members);
        break;
    }
  };
  return (
    <div className="container-sm my-5">
      <Form
        form={form}
        setForm={setForm}
        members={members}
        setMembers={setMembers}
      />
      <Search members={members} setForm={setForm} setStatus={setStatus} />
      <MemberList members={members} setMembers={setMembers} setForm={setForm} />
    </div>
  );
}

export default App;
