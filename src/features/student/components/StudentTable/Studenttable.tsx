import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { City, Student } from "../../../../models";
import { Box, Button, makeStyles, Paper } from "@material-ui/core";
import { capitalizeString, getMarkColor } from "../../../../utils/common";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  studentList: Student[];
  onEdit: (student: Student) => void;
  onRemove: (student: Student) => void;
  listCityMap: { [key: string]: City };
}

const useStyles = makeStyles((theme) => ({
  table: {},
  tableSizeSmall: {
    padding: "6px 6px 6px 16px",
  },
  btnEdit: {
    marginRight: theme.spacing(1),
  },
}));

export default function StudentTable({
  studentList,
  listCityMap,
  onEdit,
  onRemove,
}: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };
  const hanldeRemoveClick = (student: Student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleConfirmRemove = (student: Student) => {
    onRemove(student);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {studentList.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)} fontWeight="bold">
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{listCityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit(student)}
                    className={classes.btnEdit}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    onClick={() => hanldeRemoveClick(student)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Remove dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Remove Student?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure remove student {selectedStudent?.name}. This action can
            be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmRemove(selectedStudent as Student)}
            color="secondary"
            autoFocus
            variant="outlined"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
