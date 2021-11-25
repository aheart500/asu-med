import * as React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SlotInfo } from "react-big-calendar";
interface EventDialogProps {
  open: boolean;
  slotInfo: SlotInfo;
  action: () => void;
  close: () => void;
}
const EventDialog = ({ open, slotInfo, close, action }: EventDialogProps) => {
  if (!slotInfo) return null;
  return (
    <div>
      <Dialog open={open} onClose={close}>
        <DialogTitle>{slotInfo.start.toString()}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={action}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventDialog;
