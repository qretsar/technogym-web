import React from "react";
import firebase from "../firebase";

const MemberRender = ({
  member,
  setForm,
  filteredMembers,
  members,
  setMembers,
  setSearch,
  resetForm,
}) => {
  let styleRed = {
    background: "rgb(110 110 110)",
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

  const deleteButtonHandler = (e) => {
    let index = filteredMembers.findIndex(
      (member) =>
        member.viber === e.target.closest("tr").childNodes[3].innerText
    );
    let id = filteredMembers[index].id;

    const db = firebase.firestore();
    db.collection("membersA").doc(id).delete();
    let memberToDelete = members.filter((member) => member.id !== id);
    setMembers(memberToDelete);

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

      <td>{member.expirationDate.toLocaleDateString()}</td>

      <td>
        <button
          onClick={deleteButtonHandler}
          className={`" btn btn-danger
          }`}
        >
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};
export default MemberRender;
