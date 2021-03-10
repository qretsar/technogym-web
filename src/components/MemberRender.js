import React from "react";
const MemberRender = ({ member }) => {
  return (
    <tr>
      {member.ime}

      {member.prezime}
    </tr>
  );
};
export default MemberRender;
