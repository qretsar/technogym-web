import React from "react";
import { useState } from "react";
import firebase from "../firebase";
import Modal from "react-modal";
import { db } from "../firebase";
import { addMonths, format, parseISO } from "date-fns";

const MemberRender = ({
  member,
  setForm,
  filteredMembers,
  members,
  setMembers,
  setSearch,
  resetForm,
}) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [updatedMember, setUpdatedMember] = useState({
    ime: "",
    prezime: "",
    viber: "",
    datum: "",
    uplata: "",
    active: "",
  });
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50vw",
    },
  };

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
        member.viber === e.target.closest("tr").childNodes[2].innerText
    );
    let id = filteredMembers[index].id;

    const db = firebase.firestore();
    db.collection("membersA").doc(id).delete();
    let memberToDelete = members.filter((member) => member.id !== id);
    setMembers(memberToDelete);
    resetForm();
  };
  const updateMemberHandler = (e) => {};

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form action="" className="form" noValidate>
          <div className="form-group">
            <label for="ime" class="col-sm-2">
              <span className="h6 small bg-white text-muted pt-1 pl-2 pr-2">
                Ime
              </span>
            </label>
            <input
              name="ime"
              defaultValue={member.ime}
              // onChange={inputChangeHandler}
              type="text"
              placeholder="ime"
              required="required"
              className="form-control mt-n3"
              id="ime"
            />
          </div>
          <div className="form-group">
            <label for="prezime" class="col-sm-2">
              <span className="h6 small bg-white text-muted pt-1 pl-2 pr-2">
                Prezime
              </span>
            </label>
            <input
              name="prezime"
              defaultValue={member.prezime}
              // onChange={inputChangeHandler}
              // className="form-control"
              type="text"
              placeholder="ime"
              required="required"
              className="form-control mt-n3"
              id="prezime"
            />
          </div>
          <div className="form-group">
            <label for="datum" class="col-sm-12">
              <span className="h6 small bg-white text-muted pt-1 pl-2 pr-2">
                Prva registracija
              </span>
            </label>
            <input
              name="datum"
              defaultValue={member.datum}
              // onChange={inputChangeHandler}
              // className="form-control"
              type="date"
              placeholder="datum"
              required="required"
              className="form-control mt-n3"
              id="datum"
            />
          </div>
          <div className="form-group">
            <label for="valid" class="col-sm-12">
              <span className="h6 small bg-white text-muted pt-1 pl-2 pr-2">
                Vredi do
              </span>
            </label>
            <input
              name="valid"
              value={
                // new Date(member.expirationDate).toISOString().split("T")[0]
                format(member.expirationDate, "dd-MM-yyyy")
              }
              // onChange={inputChangeHandler}
              // className="form-control"
              type="text"
              // placeholder="valid"
              required="required"
              className="form-control mt-n3"
              id="valid"
            />
          </div>
          <button>Sacuvaj</button>
        </form>
      </Modal>
      <tr
        onDoubleClick={selectButtonHandler}
        style={member.active ? styleBlue : styleRed}
      >
        <td>{member.ime}</td>
        <td>{member.prezime}</td>
        <td>{member.viber}</td>
        {/* {console.log(member.valid)} */}

        <td>{format(member.expirationDate, "dd-MM-yyyy")}</td>
        <td>
          <button
            onClick={openModal}
            // onDoubleClick={deleteButtonHandler}
            className={`" btn btn-warning
          }`}
          >
            <i className="fas fa-edit"></i>
          </button>
        </td>
        <td>
          <button
            onDoubleClick={deleteButtonHandler}
            className={`" btn btn-warning
          }`}
          >
            <i className="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    </>
  );
};
export default MemberRender;
