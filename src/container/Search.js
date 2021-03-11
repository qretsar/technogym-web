import React from "react";

const Search = ({ members, setForm }) => {
  const searchHandler = (e) => {
    const filteredMembers = members.filter((member) => {
      return (
        member.ime.includes(e.target.value) ||
        member.prezime.includes(e.target.value) ||
        member.instagram.includes(e.target.value) ||
        member.viber.includes(e.target.value)
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
      </div>
      <p className="broj-clanova">Ukupan broj korisnika: {members.length}</p>
    </>
  );
};
export default Search;
