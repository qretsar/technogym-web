import React from "react";
const Search = ({
  members,
  setForm,
  setStatus,
  setSearch,
  filteredMembers,
}) => {
  const searchHandler = (e) => {
    const filteredMembers = members.filter((member) => {
      return (
        member.ime.toLowerCase().includes(e.target.value.toLowerCase()) ||
        member.prezime.toLowerCase().includes(e.target.value.toLowerCase()) ||
        // member.instagram.toLowerCase().includes(e.target.value.toLowerCase()) ||
        member.viber.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    if (filteredMembers.length === 1) {
      setForm({
        ime: filteredMembers[0].ime,
        prezime: filteredMembers[0].prezime,
        // instagram: filteredMembers[0].instagram,
        viber: filteredMembers[0].viber,
      });
    }
    setSearch(e.target.value);
    console.log("Filtered : " + filteredMembers);
  };
  const resetSearch = (e) => {
    e.target.value = "";
    setSearch("");
  };
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };
  const activeInactiveMembers = (boolean) => {
    let neaktivni = filteredMembers.filter(
      (member) => member.active === boolean
    );
    return neaktivni.length;
  };
  // console.log(`hej ${filteredMembers.activelength}`);
  return (
    <>
      <div className="input-group searchdiv">
        <input
          onClick={resetSearch}
          onKeyUp={searchHandler}
          type="text"
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
      <div style={styles.usersCount}>
        <p className="broj-clanova">Ukupan broj korisnika: {members.length}</p>
        <p className="broj-clanova">
          Aktivnih korisnika: {activeInactiveMembers(true)}
        </p>
        <p className="broj-clanova">
          Neaktivnih korisnika: {activeInactiveMembers(false)}
        </p>
      </div>
    </>
  );
};
const styles = {
  usersCount: {
    display: "flex",
    // padding: "0.1rem",
    justifyContent: "space-around",
  },
};
export default Search;
