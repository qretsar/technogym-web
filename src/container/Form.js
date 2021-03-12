import React from "react";
import { format } from "date-fns";

const Form = ({ form, setForm, members, setMembers }) => {
  //functions
  const inputChangeHandler = (e) => {
    const value = e.target.value;

    setForm({
      ...form,
      //e.target.name se odnoi na input name att
      [e.target.name]: value,
    });
  };
  let newMember = {
    ime: form.ime,
    prezime: form.prezime,
    instagram: form.instagram,
    viber: form.viber,
    uplata: form.uplata,
    datum:
      format(new Date(), "dd-MM-yyyy") >
      format(new Date(11, 1, 2014), "dd-MM-yyyy")
        ? format(new Date(), "dd-MM-yyyy")
        : "Nije veci",
    id: Math.random() + 1000,
    active: true,
  };
  const ifExits = () => {
    //Checks if user already exists
    if (members.some((member) => member.ime === form.ime)) {
      let editedMembers = members.map((item) => {
        if (item.ime === form.ime) {
          return {
            ...item,
            active: !item.active,
          };
        }
        return item;
      });
      setMembers(editedMembers);
      localStorage.setItem("members", JSON.stringify(members));
    } else {
      setMembers([...members, members.push(newMember)]);
      localStorage.setItem("members", JSON.stringify(members));
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    ifExits();
    console.log(members);
    // localStorage.setItem("members", JSON.stringify(members));
    console.log(JSON.parse(localStorage.members));
  };

  let style = {
    boxShadow: "0 0.5rem 0.4rem rgba(0, 0, 0, 0.6)",

    padding: "1rem",
  };
  // onHover={(style = { style })}
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
          />
          <input
            name="prezime"
            value={form.prezime}
            onChange={inputChangeHandler}
            className="form-control"
            type="text"
            placeholder="prezime"
          />
          <input
            name="instagram"
            value={form.instagram}
            onChange={inputChangeHandler}
            className="form-control"
            type="text"
            placeholder="instagram"
          />
          <input
            name="viber"
            value={form.viber}
            onChange={inputChangeHandler}
            className="form-control"
            type="text"
            placeholder="viber"
          />
          <input
            name="uplata"
            value={form.uplata}
            onChange={inputChangeHandler}
            className="form-control"
            type="number"
            placeholder="uplata"
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
