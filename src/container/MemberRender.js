import React from "react";
import firebase from "../firebase";
import { format, parse } from "date-fns";

const MemberRender = ({
  member,
  setForm,
  filteredMembers,
  setMembers,
  setSearch,
  resetForm,
}) => {
  let styleRed = {
    background: "rgb(223 68 89)",
    color: "white",
  };
  let styleBlue = {
    background: "",
  };
  const selectButtonHandler = (e) => {
    // console.log(e.target.closest("tr").childNodes[3].innerText);
    setForm({
      ime: member.ime,
      prezime: member.prezime,
      instagram: member.instagram,
      viber: member.viber,
    });
    setSearch("");
  };
  // const onDelete = () => {
  //   const db = firebase.firestore();
  //   db.collection("spells").doc(spell.id).delete();
  // };
  const deleteButtonHandler = (e) => {
    let index = filteredMembers.findIndex(
      (member) =>
        member.viber === e.target.closest("tr").childNodes[3].innerText
    );
    let id = filteredMembers[index].id;

    // console.log(`${index} i id ${id}`);
    const db = firebase.firestore();
    db.collection("members").doc(id).delete();

    // setMembers(allMembers);
    // localStorage.setItem("members", JSON.stringify(allMembers));
    resetForm();
  };

  return (
    <tr
      onDoubleClick={selectButtonHandler}
      style={member.active ? styleBlue : styleRed}
    >
      <td>{member.ime}</td>
      <td>{member.prezime}</td>
      <td>{member.instagram}</td>
      <td>{member.viber}</td>
      {/* {console.log(member.valid)} */}
      <td>{format(member.valid.toDate(), "dd-MM-yyyy")}</td>
      {/* <td>
        <button onClick={selectButtonHandler} className="btn btn-info">
          <i className="fas fa-check"></i>
        </button>
      </td> */}
      <td>
        <button
          onClick={deleteButtonHandler}
          className={`" ${
            member.active ? "btn btn-danger" : "btn btn-warning"
          }`}
        >
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};
export default MemberRender;
