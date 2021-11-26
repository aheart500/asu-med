import { TextField, Button, Typography } from "@material-ui/core";
import { useFormik, FormikErrors } from "formik";
import { SavingFormValues } from "../../types";
import styles from "../../styles/Home.module.css";
import axios from "axios";
import { useContext, useState } from "react";
import StudentContext from "../../Contexts/Student/StudentContext";
import { useRouter } from "next/router";
const validate = (values: SavingFormValues) => {
  let errors: FormikErrors<SavingFormValues> = {};
  if (!values.id) {
    errors.id = "Required";
  } else if (values.id.length < 5 || values.id.length > 6) {
    errors.id = "Must be 5 or 6 characters";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be 8 characters or more";
  }
  if (!values.grades) {
    errors.grades = "Required";
  } else if (parseInt(values.grades) < 0 || parseInt(values.grades) > 300) {
    errors.grades = "Can't be lower than 0 or higher than 300";
  }
  return errors;
};

const SavingDataForm = () => {
  const { Save } = useContext(StudentContext);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const formik = useFormik<SavingFormValues>({
    initialValues: {
      id: "",
      password: "",
      grades: "",
    },
    validate,
    onSubmit: (values) => {
      setErrorMessage("");
      axios
        .post("/api/tools/student", values)
        .then(({ data }) => {
          if (data.error) {
            setErrorMessage(data.message);
          } else {
            Save({
              rank: data.rank,
              rankAmongGroup: data.rankAmongGroup,
              empStudents: data.empStudents,
              mainstreamStudents: data.mainstreamStudents,
              total: data.total,
              id: values.id,
            });
            router.push("/tools/rank/result");
          }
        })
        .catch((err) => console.log(err));
    },
  });

  const restOfProps = (field: keyof SavingFormValues) => ({
    error: formik.touched[field] && !!formik.errors[field],
    helperText: formik.touched[field] && formik.errors[field],
    ...formik.getFieldProps(field),
  });

  return (
    <>
      <h1>Adding your grades for the first time?</h1>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <TextField
          className={styles.txtField}
          id="id1"
          label="ID"
          type="text"
          variant="outlined"
          {...restOfProps("id")}
        />
        <TextField
          id="password1"
          className={styles.txtField}
          label="Password"
          variant="outlined"
          type="password"
          {...restOfProps("password")}
        />
        <TextField
          id="grades"
          className={styles.txtField}
          label="Grades"
          variant="outlined"
          type="number"
          InputProps={{ inputProps: { step: "any" } }}
          {...restOfProps("grades")}
        />
        <Typography variant="subtitle2">
          Your grades out of 300 including CNS, Special Senses and Communication
          Skills
        </Typography>
        {errorMessage ? (
          <Typography variant="subtitle1" style={{ color: "red" }}>
            {errorMessage}
          </Typography>
        ) : null}
        <Button
          className={styles.button}
          color="primary"
          type="submit"
          variant="contained"
        >
          Save & Fetch the rank
        </Button>
      </form>
    </>
  );
};

export default SavingDataForm;
