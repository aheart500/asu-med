import { Router } from "express";
import FamilyModel from "../models/Family";
import EventModel from "../models/Event";

const FamiliesRouter = Router();

FamiliesRouter.get("/:familyname", (req, res) => {
  const findByFamilyName = req.params.familyname;
  FamilyModel.find(findByFamilyName ? { name: findByFamilyName } : {})
    .then((families) => res.send(families))
    .catch((e) => {
      res.status(400).send("Error Finding Family");
    });
});
FamiliesRouter.post("/", (req, res) => {
  FamilyModel.create({ name: req.body.name })
    .then((family) => {
      res.send(family);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});
FamiliesRouter.delete("/:familyId", (req, res) => {
  FamilyModel.deleteOne({ _id: req.params.familyId })
    .then((result) => res.send(result))
    .catch((e) => {
      res.status(400).send("Error Deleting Family");
    });
});
FamiliesRouter.get("/events/:familyname", (req, res) => {
  FamilyModel.findOne({ name: req.params.familyname })
    .populate("events")
    .exec()
    .then((family) => {
      res.send(family.events);
    })
    .catch((e) => {
      res.status(400).send("Error Finding Family");
    });
});
FamiliesRouter.post("/events/:familyid", (req, res) => {
  EventModel.create({ ...req.body, family: req.params.familyid })
    .then((event) => {
      FamilyModel.findById(req.params.familyid).then((f) => {
        f.events.push(event._id);
        f.save();
      });
      res.send(event);
    })
    .catch((e) => {
      res.status(400).send("Error Saving Event");
    });
});
FamiliesRouter.patch("/events/:eventId", (req, res) => {
  EventModel.findByIdAndUpdate(
    req.params.eventId,
    { $set: req.body },
    { new: true }
  )
    .then((event) => {
      res.send(event);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

FamiliesRouter.delete("/events/:eventId", (req, res) => {
  EventModel.deleteOne({ _id: req.params.eventId })
    .then((result) => res.send(result))
    .catch((e) => {
      res.status(400).send("Error Deleting Event");
    });
});
export default FamiliesRouter;
