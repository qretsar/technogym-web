import React from "react";
const MemberRender = ({ member }) => {
  return (
    <tr>
      <td>{member.ime}</td>
      <td>{member.prezime}</td>
      <td>{member.instagram}</td>
      <td>{member.viber}</td>
      <td>{member.datum}</td>
      <td>
        <button>Test</button>
      </td>
    </tr>
  );
};
export default MemberRender;
