import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Container from "@material-ui/core/Container";
import { useFormik, FormikErrors } from "formik";
import { GPAFormValues } from "../../types";
import { TextField, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
const possibleCapitalAnswers = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"];
const possibleAnswers = [
  ...possibleCapitalAnswers,
  ...possibleCapitalAnswers.map((a) => a.toLowerCase()),
];

const convertGpaToValue = (gpa: string): number => {
  let value = 0;
  switch (gpa) {
    case "A+":
    case "a+":
    case "A":
    case "a":
      value = 4;
      break;
    case "A-":
    case "a-":
      value = 3.7;
      break;
    case "B+":
    case "b+":
      value = 3.3;
      break;
    case "B":
    case "b":
      value = 3;
      break;
    case "B-":
    case "b-":
      value = 2.7;
      break;
    case "C+":
    case "c+":
      value = 2.3;
      break;
    case "C":
    case "c":
      value = 2;
      break;
    case "C-":
    case "c-":
      value = 1.7;
      break;
    case "D+":
    case "d-":
      value = 1.3;
      break;
    case "D":
    case "d":
      value = 1;
      break;
    case "F":
    case "f":
      value = 0;
      break;
    default:
      value = 0;
  }
  return value;
};

const validate = (values: GPAFormValues) => {
  let errors: FormikErrors<GPAFormValues> = {};
  if (!values.cns) {
    errors.cns = "Required";
  } else if (!possibleAnswers.includes(values.cns)) {
    errors.cns = "Please enter a valid value e.g. A+, B, C-";
  }
  if (!values.specialSenses) {
    errors.specialSenses = "Required";
  } else if (!possibleAnswers.includes(values.specialSenses)) {
    errors.specialSenses = "Please enter a valid value e.g. A+, B, C-";
  }
  if (!values.communicationSkills) {
    errors.communicationSkills = "Required";
  } else if (!possibleAnswers.includes(values.communicationSkills)) {
    errors.communicationSkills = "Please enter a valid value e.g. A+, B, C-";
  }
  return errors;
};

const GPA = () => {
  const [gpa, setGPA] = useState<number>(null);
  const formik = useFormik<GPAFormValues>({
    initialValues: {
      cns: "",
      specialSenses: "",
      communicationSkills: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  useEffect(() => {
    const errs = validate(formik.values);
    if (Object.keys(errs).length === 0) {
      const cnsValue = convertGpaToValue(formik.values.cns);
      const specialSensesValue = convertGpaToValue(formik.values.specialSenses);
      const communicationSkillsValue = convertGpaToValue(formik.values.communicationSkills);
      const calculatedGPA =
        (cnsValue * 225 + specialSensesValue * 50 + communicationSkillsValue * 25) / 300;
      setGPA(Math.round((calculatedGPA + Number.EPSILON) * 1000) / 1000);
    } else {
      setGPA(null);
    }
  }, [formik.values]);
  const restOfProps = (field: keyof GPAFormValues) => ({
    error: formik.touched[field] && !!formik.errors[field],
    helperText: formik.touched[field] && formik.errors[field],
    ...formik.getFieldProps(field),
  });

  return (
    <div>
      <Head>
        <title>GPA Calculator</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <Container maxWidth="sm" className={styles.container}>
        <h1>GPA Calculator</h1>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <TextField
            className={styles.txtField}
            id="cns"
            label="CNS"
            type="text"
            variant="outlined"
            {...restOfProps("cns")}
          />
          <TextField
            id="specialSenses"
            className={styles.txtField}
            label="Special Senses"
            variant="outlined"
            type="text"
            {...restOfProps("specialSenses")}
          />
          <TextField
            id="communicationSkills"
            className={styles.txtField}
            label="Communication Skills"
            variant="outlined"
            type="text"
            {...restOfProps("communicationSkills")}
          />
          {gpa ? <h1>Your GPA: {gpa}</h1> : ""}
        </form>
      </Container>
    </div>
  );
};
export default GPA;
