import React from "react";

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

  const ifExits = () => {
    if (members.some((member) => member.ime === form.ime)) {
      setMembers(
        members.map((item) => {
          if (item.ime === form.ime) {
            return {
              ...item,
              active: !item.active,
            };
          }
          return item;
        })
      );
    } else {
      let newMember = {
        ime: form.ime,
        prezime: form.prezime,
        instagram: form.instagram,
        viber: form.viber,
        uplata: form.uplata,
        datum: new Date(),
        id: Math.random() + 1000,
        active: true,
      };
      return setMembers([...members, members.push(newMember)]);
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    ifExits();
    console.log(members);
    localStorage.setItem("members", JSON.stringify(members));
    console.log(JSON.parse(localStorage.members));
  };

  return (
    <div className="container-sm my-5">
      <form>
        <input
          name="ime"
          value={form.ime}
          onChange={inputChangeHandler}
          className="input-group"
          type="text"
          placeholder="ime"
        />
        <input
          name="prezime"
          value={form.prezime}
          onChange={inputChangeHandler}
          className="input-group"
          type="text"
          placeholder="prezime"
        />
        <input
          name="instagram"
          value={form.instagram}
          onChange={inputChangeHandler}
          className="input-group"
          type="text"
          placeholder="instagram"
        />
        <input
          name="viber"
          value={form.viber}
          onChange={inputChangeHandler}
          className="input-group"
          type="text"
          placeholder="viber"
        />
        <input
          name="uplata"
          value={form.uplata}
          onChange={inputChangeHandler}
          className="input-group"
          type="number"
          placeholder="uplata"
        />
        <button
          onClick={formSubmitHandler}
          className="todo-button"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Form;
