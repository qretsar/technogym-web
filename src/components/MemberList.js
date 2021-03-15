import React from "react";
import MemberRender from "../container/MemberRender";

const MemberList = ({
  filteredMembers,
  members,
  setMembers,
  setForm,
  resetForm,
  setSearch,
}) => {
  return (
    <div className="table-responsive">
      <table id="flip-scroll" className="table table-striped table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">Ime</th>
            <th scope="col">Prezime</th>
            <th scope="col">instagram</th>
            <th scope="col">viber</th>
            <th scope="col">datum isteka</th>
            {/* <th scope="col">Odaberi</th> */}
            <th scope="col">Izbriši</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <MemberRender
              key={member.id}
              member={member}
              setForm={setForm}
              resetForm={resetForm}
              filteredMembers={filteredMembers}
              members={members}
              setMembers={setMembers}
              setSearch={setSearch}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default MemberList;
