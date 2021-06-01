import { TextField, Button, Typography } from "@material-ui/core";
import { useFormik, FormikErrors } from "formik";
import { SavingFormValues } from "../types";
import styles from "../styles/Home.module.css";

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
  }
  return errors;
};

const SavingDataForm = () => {
  const formik = useFormik<SavingFormValues>({
    initialValues: {
      id: "",
      password: "",
      grades: null,
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
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
          id="id"
          label="ID"
          type="text"
          variant="outlined"
          {...restOfProps("id")}
        />
        <TextField
          id="password"
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
          {...restOfProps("grades")}
        />
        <Typography variant="subtitle2">
          Your grades out of 400 including Clinical, Research and Psychology
        </Typography>
        <Button className={styles.button} color="primary" type="submit" variant="contained">
          Save & Fetch the rank
        </Button>
      </form>
    </>
  );
};

export default SavingDataForm;
