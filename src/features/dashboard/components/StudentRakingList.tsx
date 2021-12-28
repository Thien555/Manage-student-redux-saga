import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Student } from "../../../models";

interface Props {
  studentList: Student[];
}

const useStyles = makeStyles({
  table: {},
  tableSizeSmall: {
    padding: "6px 6px 6px 16px",
  },
});

export default function StudentRakingList({ studentList }: Props) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              classes={{ sizeSmall: classes.tableSizeSmall }}
              align="center"
            >
              #
            </TableCell>
            <TableCell
              classes={{ sizeSmall: classes.tableSizeSmall }}
              align="left"
            >
              Name
            </TableCell>
            <TableCell
              classes={{ sizeSmall: classes.tableSizeSmall }}
              align="right"
            >
              Mark
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {studentList.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell
                classes={{ sizeSmall: classes.tableSizeSmall }}
                align="center"
              >
                {index + 1}
              </TableCell>
              <TableCell
                classes={{ sizeSmall: classes.tableSizeSmall }}
                align="left"
              >
                {student.name}
              </TableCell>
              <TableCell
                classes={{ sizeSmall: classes.tableSizeSmall }}
                align="right"
              >
                {student.mark}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
