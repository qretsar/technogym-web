import React from "react";
import { addMonths, format } from "date-fns";
import firebase from "../firebase";

const Form = ({
  form,
  setForm,
  members,
  setMembers,
  resetForm,
  setJelena,
  // loadMembersFromLS,
}) => {
  const inputChangeHandler = (e) => {
    const value = e.target.value;

    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  // };
  const fbExists = () => {
    //Checks if user already exists
    let brojUplacenihMeseci = Math.ceil(
      form.uplata === "" ? 0 : form.uplata / 30
    );
    if (
      form.ime.length < 2 ||
      form.prezime.length < 2 ||
      form.viber.length < 6
    ) {
      alert("Ime, prezime i broj telefona su obavezni");
      return;
    }
    // loadMembersFromLS();
    const db = firebase.firestore();
    if (members.some((member) => member.ime === form.ime)) {
      let editedMembers = members.map((item) => {
        if (item.ime === form.ime) {
          item.expirationDate = addMonths(
            item.expirationDate,
            brojUplacenihMeseci
          );
          db.collection("membersA")
            .doc(item.id)
            .set({
              ...item,
              ime: form.ime,
              prezime: form.prezime,
              // instagram: form.instagram,
              viber: form.viber,
              expirationDate: addMonths(
                item.expirationDate,
                brojUplacenihMeseci
              ),
            });
        }
        return item;
      });
      console.log("Setuje");
      setMembers(editedMembers);
    } else {
      let newMember = {
        ime: form.ime,
        prezime: form.prezime,
        // instagram: form.instagram,
        viber: form.viber,
        uplata: form.uplata === "" ? 0 : form.uplata,
        datum: form.datum !== "" ? form.datum : new Date().toString(),
        expirationDate: addMonths(
          new Date(form.datum).getTime(),
          brojUplacenihMeseci
        ),
        active: true,
      };
      setMembers([...members, newMember]);
      db.collection("membersA").doc().set(newMember);
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
          {/* <input
            name="instagram"
            value={form.instagram}
            onChange={inputChangeHandler}
            className="form-control"
            type="text"
            placeholder="instagram"
            required
          /> */}
          <input
            name="viber"
            value={form.viber}
            onChange={inputChangeHandler}
            className="form-control"
            type="number"
            placeholder="telefon"
            required
          />
          <input
            name="datum"
            value={form.datum}
            // defaultValue={new Date().toISOString().split("T")[0]}
            onChange={inputChangeHandler}
            className="form-control"
            type="date"
            // placeholder="telefon"
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
