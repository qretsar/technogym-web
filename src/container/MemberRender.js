import React from "react";

const MemberRender = ({ member, setForm, members, setMembers }) => {
  let styleRed = {
    background: "#df4459bc",
    color: "white",
  };
  let styleBlue = {
    background: "",
  };
  const selectButtonHandler = (e) => {
    console.log(e.target.closest("tr").childNodes[3].innerText);
    setForm({
      ime: member.ime,
      prezime: member.prezime,
      instagram: member.instagram,
      viber: member.viber,
    });
  };
  const deleteButtonHandler = (e) => {
    console.log();
    let allMembers = members.filter(
      (member) =>
        member.viber !== e.target.closest("tr").childNodes[3].innerText
    );
    setMembers(allMembers);
    localStorage.setItem("members", JSON.stringify(allMembers));
  };
  return (
    <tr style={member.active ? styleBlue : styleRed}>
      <td>{member.ime}</td>
      <td>{member.prezime}</td>
      <td>{member.instagram}</td>
      <td>{member.viber}</td>
      <td>{member.datum}</td>
      <td>
        <button onClick={selectButtonHandler} className="btn btn-info">
          <i className="fas fa-check"></i>
        </button>
      </td>
      <td>
        <button onDoubleClick={deleteButtonHandler} className="btn btn-danger">
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};
export default MemberRender;
