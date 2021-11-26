import * as React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SlotInfo } from "react-big-calendar";
import { useState, useEffect } from "react";
import addMinutes from "date-fns/addMinutes";
import { isTwoObjectsFieldsTheSame } from "../../utils/helperFunctions";
interface EventDialogProps {
  open: boolean;
  info: SlotInfo | any;
  submit: (event: any) => void;
  handleDelete: (id: string) => void;
  close: () => void;
}
const initialEvent = {
  title: "",
  description: "",
  duration: 60,
};
const EventDialog = ({
  open,
  info,
  close,
  handleDelete,
  submit,
}: EventDialogProps) => {
  const editMode = info?._id ? true : false;
  const [event, setEvent] = useState<any>(editMode ? info : initialEvent);
  useEffect(() => {
    setEvent(editMode ? info : initialEvent);
  }, [info]);
  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    submit({
      ...event,
      start: info.start,
      end: addMinutes(new Date(info.start), event.duration),
    });
    setEvent(initialEvent);
    close();
  };
  const onDelete = () => {
    handleDelete(info./*  */ _id);
    setEvent(initialEvent);
    close();
  };

  const isEventDifferent =
    info &&
    event &&
    isTwoObjectsFieldsTheSame(info, event, [
      "title",
      "description",
      "duration",
    ]);
  if (!info) return null;
  return (
    <div>
      <Dialog open={open} onClose={close}>
        <DialogTitle>{editMode ? "Event Details" : "New Event"}</DialogTitle>
        <form>
          <DialogContent>
            <DialogContentText>
              Add details about the {editMode ? "" : "new"} event (e.g.: Title,
              Description, Duration). You can change them later.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Event title"
              fullWidth
              variant="standard"
              value={event.title}
              onChange={handleOnChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Event description"
              fullWidth
              multiline
              rows={5}
              variant="standard"
              value={event.description}
              onChange={handleOnChange}
            />
            <TextField
              margin="dense"
              name="duration"
              label="Duration"
              type="number"
              variant="standard"
              placeholder="In Minutes"
              value={event.duration}
              onChange={handleOnChange}
            />
          </DialogContent>
          <DialogActions>
            {isEventDifferent ? null : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={onSubmit}
              >
                {editMode ? "Update" : "Save"}
              </Button>
            )}
            {editMode && (
              <Button onClick={onDelete} variant="contained" color="secondary">
                Delete
              </Button>
            )}
            <Button onClick={close}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default EventDialog;
