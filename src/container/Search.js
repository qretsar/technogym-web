import React from "react";
const Search = ({ members, setForm, setStatus }) => {
  const searchHandler = (e) => {
    const filteredMembers = members.filter((member) => {
      return (
        member.ime.toLowerCase().includes(e.target.value.toLowerCase()) ||
        member.prezime.toLowerCase().includes(e.target.value.toLowerCase()) ||
        member.instagram.toLowerCase().includes(e.target.value.toLowerCase()) ||
        member.viber.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    if (filteredMembers.length === 1) {
      setForm({
        ime: filteredMembers[0].ime,
        prezime: filteredMembers[0].prezime,
        instagram: filteredMembers[0].instagram,
        viber: filteredMembers[0].viber,
      });
    }
    console.log(filteredMembers);
  };
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };
  return (
    <>
      <div className="input-group searchdiv">
        <input
          onKeyUp={searchHandler}
          type="t   ext"
          name="search"
          placeholder="Pretrazi"
          className="form-control"
          id="search"
        />

        <select onChange={statusHandler} name="todos" className="form-select">
          <option value="svi">Svi korisnici</option>
          <option value="aktivni">Aktivni</option>
          <option value="neaktivni">Neaktivni</option>
        </select>
      </div>
      <p className="broj-clanova">Ukupan broj korisnika: {members.length}</p>
    </>
  );
};
export default Search;
