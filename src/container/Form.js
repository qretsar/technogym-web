import React from "react";
import { format, parse, addMonths } from "date-fns";
import firebase from "../firebase";

const Form = ({
  form,
  setForm,
  members,
  setMembers,
  resetForm,
  setSwitcher,
  // loadMembersFromLS,
}) => {
  const inputChangeHandler = (e) => {
    const value = e.target.value;

    setForm({
      ...form,
      //e.target.name se odnoi na input name att
      [e.target.name]: value,
    });
  };
  const addToFirebase = (selectedMember) => {
    const db = firebase.firestore();
    db.collection("members").add(selectedMember);
  };
  const fbExists = () => {
    //Checks if user already exists
    let brojUplacenihMeseci = Math.ceil(
      form.uplata == "" ? 0 : form.uplata / 30
    );
    // loadMembersFromLS();
    const db = firebase.firestore();
    if (members.some((member) => member.ime === form.ime)) {
      let editedMembers = members.map((item) => {
        if (item.ime === form.ime) {
          db.collection("members")
            .doc(item.id)
            .set({
              ...item,
              ime: form.ime,
              prezime: form.prezime,
              instagram: form.instagram,
              viber: form.viber,
              valid: addMonths(item.valid.toDate(), brojUplacenihMeseci),
            });
        }
        return item;
      });

      // setMembers(editedMembers);
    } else {
      let newMember = {
        ime: form.ime,
        prezime: form.prezime,
        instagram: form.instagram,
        viber: form.viber,
        uplata: form.uplata == "" ? 0 : form.uplata,
        datum: new Date(),
        valid: addMonths(new Date(), brojUplacenihMeseci),
        active: true,
      };
      // setMembers([...members, members.push(newMember)]);
      db.collection("members").doc().set(newMember);
      // addToFirebase(members);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    fbExists();

    resetForm();
  };

  return (
    <div>
      <form action="" className="form" noValidate>
        <div className="input-group">
          <input
            name="ime"
            value={form.ime}
            onChange={inputChangeHandler}
            className="form-control"
            type="text"
            placeholder="ime"
            required="required"
          />
          <input
            name="prezime"
            value={form.prezime}
            onChange={inputChangeHandler}
            className="form-control"
            type="text"
            placeholder="prezime"
            required="required"
          />
          <input
            name="instagram"
            value={form.instagram}
            onChange={inputChangeHandler}
            className="form-control"
            type="text"
            placeholder="instagram"
            required
          />
          <input
            name="viber"
            value={form.viber}
            onChange={inputChangeHandler}
            className="form-control"
            type="text"
            placeholder="viber"
            required
          />
          <input
            name="uplata"
            value={form.uplata}
            onChange={inputChangeHandler}
            className="form-control"
            type="number"
            placeholder="uplata"
            required
          />
          <button
            onClick={formSubmitHandler}
            className="btn btn-outline-secondary"
            value="add"
            type="submit"
          >
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
