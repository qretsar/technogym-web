import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable({ members }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ime</TableCell>
            <TableCell align="right">Prezime</TableCell>
            <TableCell align="right">Instagram</TableCell>
            <TableCell align="right">Viber</TableCell>
            <TableCell align="right">Datum isteka</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.viber}>
              <TableCell component="th" scope="row">
                {member.ime}
              </TableCell>
              <TableCell align="right">{member.prezime}</TableCell>
              <TableCell align="right">{member.instagram}</TableCell>
              <TableCell align="right">{member.viber}</TableCell>
              <TableCell align="right">{member.datum}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
