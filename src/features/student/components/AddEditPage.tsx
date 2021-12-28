import { Box, Typography } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import studentApi from "../../../api/studentApi";
import { Student } from "../../../models";
import StudentForm from "./StudentForm/StudentForm";

interface Props {}

const AddEditPage = (props: Props) => {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();
  const history = useHistory();
  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const response: Student = await studentApi.getById(studentId);
        setStudent(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }

    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER,
    });
    history.push("/admin/students");
  };

  const currentStudent: Student = {
    name: "",
    age: "",
    mark: "",
    gender: "",
    city: "",
    ...student,
  } as Student;
  return (
    <Box>
      <Link to="/admin/students" style={{ textDecoration: "none" }}>
        <Typography
          variant="caption"
          style={{ display: "flex", alignItems: "center" }}
        >
          <ChevronLeft /> &nbsp;Back
        </Typography>
      </Link>
      <Typography variant="h4">
        {isEdit ? "Update Student" : "Add new student"}
      </Typography>
      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm
            initialValues={currentStudent}
            onSubmit={handleStudentFormSubmit}
          />
        </Box>
      )}
    </Box>
  );
};

export default AddEditPage;
