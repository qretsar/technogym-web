import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
//Importing Components
import Form from "./container/Form";
import MemberList from "./components/MemberList";
import BasicTable from "./components/Table";
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
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setMembers(JSON.parse(localStorage.getItem("members")));
    // console.log(JSON.parse(localStorage.members));
  }, [localStorage.members]);
  return (
    <div className="container-sm my-5">
      <Form
        form={form}
        setForm={setForm}
        members={members}
        setMembers={setMembers}
      />
      {/* <BasicTable members={members} /> */}
      <MemberList members={members} setMembers={setMembers} setForm={setForm} />
    </div>
  );
}

export default App;
