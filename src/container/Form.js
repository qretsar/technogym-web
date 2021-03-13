import React from "react";
import { format, parse } from "date-fns";

const Form = ({ form, setForm, members, setMembers }) => {
  const setSubscriptionDate = (inpDatum, brojUplacenihMeseci) => {
    let datum = new Date(
      inpDatum.setMonth(inpDatum.getMonth() + brojUplacenihMeseci)
    );
    console.log("Updated date: " + datum);
    datum = format(datum, "dd-MM-yyyy");
    return datum;
  };
  const inputChangeHandler = (e) => {
    const value = e.target.value;

    setForm({
      ...form,
      //e.target.name se odnoi na input name att
      [e.target.name]: value,
    });
  };

  // let newMember = {
  //   ime: form.ime,
  //   prezime: form.prezime,
  //   instagram: form.instagram,
  //   viber: form.viber,
  //   uplata: form.uplata,
  //   datum: format(new Date(), "dd-MM-yyyy"),
  //   valid: setSubscriptionDate(new Date(), brojUplacenihMeseci),
  //   id: Math.random() + 1000,
  //   active: true,
  // };
  const ifExits = () => {
    //Checks if user already exists
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    let brojUplacenihMeseci = Math.ceil(form.uplata / 30);
    // ifExits();
    if (members.some((member) => member.ime === form.ime)) {
      let editedMembers = members.map((item) => {
        if (item.ime === form.ime) {
          console.log(
            "Valid: " + parse(item.valid.toString(), "dd-MM-yyyy", new Date())
          );
          return {
            ...item,
            ime: form.ime,
            prezime: form.prezime,
            instagram: form.instagram,
            viber: form.viber,
            valid: setSubscriptionDate(
              parse(item.valid, "dd-MM-yyyy", new Date()),
              brojUplacenihMeseci
            ),
          };
        }
        return item;
      });
      console.log(editedMembers);
      setMembers(editedMembers);
      localStorage.setItem("members", JSON.stringify(editedMembers));

      console.log(JSON.parse(localStorage.members));
    } else {
      setMembers([
        ...members,
        members.push({
          ime: form.ime,
          prezime: form.prezime,
          instagram: form.instagram,
          viber: form.viber,
          uplata: form.uplata,
          datum: format(new Date(), "dd-MM-yyyy"),
          valid: setSubscriptionDate(new Date(), brojUplacenihMeseci),
          id: Math.random() + 1000,
          active: true,
        }),
      ]);
      localStorage.setItem("members", JSON.stringify(members));
    }
  };

  return (
    <div>
      <form action="" className="form">
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
