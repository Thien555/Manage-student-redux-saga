import { Box, Button, CircularProgress } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../../app/hooks";
import { InputFiled } from "../../../../components/FormFileds/inputFiled";
import { RadioGroupFiled } from "../../../../components/FormFileds/RadioGroupFiled";
import { SelectFiled } from "../../../../components/FormFileds/SelectFiled";
import { GENDER_STUDENT } from "../../../../contants/contants";
import { Student } from "../../../../models";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import studentApi from "../../../../api/studentApi";

interface Props {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .test("two-words", "Please enter at least two words", (value) => {
      if (!value) return true;
      const parts = value?.split(" ") || [];
      return parts.filter((word) => !!word).length >= 2;
    }),
  age: yup
    .number()
    .positive()
    .integer("Please enter an integer.")
    .required()
    .min(18)
    .max(60)

    .typeError("Please enter a valid number."),
  mark: yup
    .number()
    .positive()
    .min(0, "Min is 0")
    .max(10, "Max is 10")
    .typeError("Please enter a valid number.")
    .required(),
  gender: yup.string().oneOf(["male", "female"]).required(),
  city: yup.string().required(),
});

const StudentForm = ({ initialValues, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const listCity = useAppSelector((state) => state.city.list);
  const listCityOptions = listCity.map((city) => ({
    label: city.name,
    value: city.code,
  }));

  const handleFormSubmit = async (formValues: Student) => {
    await onSubmit?.(formValues);
  };
  return (
    <Box maxWidth={450}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputFiled name="name" control={control} label="Full Name" />
        <RadioGroupFiled
          name="gender"
          control={control}
          label="Gender"
          options={GENDER_STUDENT}
        />
        <InputFiled name="age" control={control} label="Age" />
        <InputFiled name="mark" control={control} label="Mark" />
        <SelectFiled
          name="city"
          control={control}
          label="City"
          options={listCityOptions}
        />
        <Box>
          <Button type="submit" variant="contained" color="primary">
            {isSubmitting && <CircularProgress size={16} color="secondary" />}
            &nbsp; Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default StudentForm;
