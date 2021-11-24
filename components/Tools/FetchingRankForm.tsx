import { TextField, Button, Typography } from "@material-ui/core";
import { useFormik, FormikErrors } from "formik";
import { FetchingFormValues } from "../../types";
import styles from "../../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import StudentContext from "../../Contexts/Student/StudentContext";
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
  const router = useRouter();
  const { Save } = useContext(StudentContext);
  const [errorMessage, setErrorMessage] = useState("");
  const fetchingFormik = useFormik<FetchingFormValues>({
    initialValues: {
      id: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      setErrorMessage("");
      axios
        .post("/api/rank", values)
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
          id="id2"
          label="ID"
          type="text"
          variant="outlined"
          {...fetchingRestOfProps("id")}
        />
        <TextField
          id="password2"
          className={styles.txtField}
          label="Password"
          variant="outlined"
          type="password"
          {...fetchingRestOfProps("password")}
        />
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
          Fetch the rank
        </Button>
      </form>
    </>
  );
};

export default FetchingRankForm;
