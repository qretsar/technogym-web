import React from "react";
import MemberRender from "./MemberRender";

const MemberList = ({ members }) => {
  return (
    <div className="table-responsive">
      <table id="table-all" className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Ime</th>
            <th scope="col">Prezime</th>
            <th scope="col">instagram</th>
            <th scope="col">viber</th>
            <th scope="col">datum isteka</th>
            <th scope="col">Ukloni</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <MemberRender key={member.id} member={member} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default MemberList;
