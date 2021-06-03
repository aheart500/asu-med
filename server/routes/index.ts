import { Router } from "express";
import Student from "../models/Student";
const route = Router();

route.post("/rank", async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    res.send({ error: true, message: "No ID or password provided" });
    return;
  }
  try {
    const user = await Student.findOne({ id }).select("password");
    if (!user) {
      res.send({ error: true, message: "This ID isn't registered yet!" });
      return;
    } else if (!(await user.matchesPassword(password))) {
      res.send({ error: true, message: "Wrong password" });
      return;
    } else {
      Student.find({})
        .sort("-grades")
        .select("id")
        .then((studentsGrades) => {
          let empStudents = 0;
          let mainstreamStudents = 0;
          studentsGrades.forEach((s) =>
            s.id.toString().length === 5 ? empStudents++ : mainstreamStudents++
          );
          res.send({
            error: false,
            rank: studentsGrades.findIndex((s) => s.id === parseInt(id)) + 1,
            rankAmongGroup:
              studentsGrades
                .filter((s) =>
                  id.length === 5 ? s.id.toString().length === 5 : s.id.toString().length === 6
                )
                .findIndex((s) => s.id === parseInt(id)) + 1,
            empStudents,
            mainstreamStudents,
            total: empStudents + mainstreamStudents,
          });
        });
    }
  } catch (e) {
    console.log(e);
  }
});

route.post("/student", async (req, res) => {
  const { id, password, grades } = req.body;
  if (!id || !password || !grades) {
    res.send({ error: true, message: "No ID, password or grades provided" });
    return;
  }
  try {
    const user = await Student.findOne({ id }).select("password");
    if (user) {
      res.send({ error: true, message: "This ID is already registered!" });
      return;
    } else {
      Student.create({ id, password, grades })
        .then(() => {
          Student.find({})
            .sort("-grades")
            .select("id")
            .then((studentsGrades) => {
              let empStudents = 0;
              let mainstreamStudents = 0;
              studentsGrades.forEach((s) =>
                s.id.toString().length === 5 ? empStudents++ : mainstreamStudents++
              );
              res.send({
                error: false,
                rank: studentsGrades.findIndex((s) => s.id === parseInt(id)) + 1,
                rankAmongGroup:
                  studentsGrades
                    .filter((s) =>
                      id.length === 5 ? s.id.toString().length === 5 : s.id.toString().length === 6
                    )
                    .findIndex((s) => s.id === parseInt(id)) + 1,
                empStudents,
                mainstreamStudents,
                total: empStudents + mainstreamStudents,
              });
            });
        })
        .catch((e) => console.log(e));
    }
  } catch (e) {
    console.log(e);
  }
});

export default route;
