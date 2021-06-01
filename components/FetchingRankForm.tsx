import { TextField, Button } from "@material-ui/core";
import { useFormik, FormikErrors } from "formik";
import { FetchingFormValues } from "../types";
import styles from "../styles/Home.module.css";

const validate = (values: FetchingFormValues) => {
  let errors: FormikErrors<FetchingFormValues> = {};
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
  return errors;
};

const FetchingRankForm = () => {
  const fetchingFormik = useFormik<FetchingFormValues>({
    initialValues: {
      id: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const fetchingRestOfProps = (field: keyof FetchingFormValues) => ({
    error: fetchingFormik.touched[field] && !!fetchingFormik.errors[field],
    helperText: fetchingFormik.touched[field] && fetchingFormik.errors[field],
    ...fetchingFormik.getFieldProps(field),
  });
  return (
    <>
      <h1>Already registered?</h1>
      <form onSubmit={fetchingFormik.handleSubmit} className={styles.form}>
        <TextField
          className={styles.txtField}
          id="id"
          label="ID"
          type="text"
          variant="outlined"
          {...fetchingRestOfProps("id")}
        />
        <TextField
          id="password"
          className={styles.txtField}
          label="Password"
          variant="outlined"
          type="password"
          {...fetchingRestOfProps("password")}
        />

        <Button className={styles.button} color="primary" type="submit" variant="contained">
          Fetch the rank
        </Button>
      </form>
    </>
  );
};

export default FetchingRankForm;
