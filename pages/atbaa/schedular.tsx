import React, { useState } from "react";
import { SlotInfo } from "react-big-calendar";
import EventDialog from "../../components/Atbaa/EventDialog";
import Schedular from "../../components/Atbaa/Schedular";

const schedular = () => {
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const closeEventDialog = () => setEventDialogOpen(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo>(null);
  const openDialog = (slot: SlotInfo) => {
    setSelectedSlot(slot);
    setEventDialogOpen(true);
  };
  return (
    <div>
      <EventDialog
        open={eventDialogOpen}
        slotInfo={selectedSlot}
        close={closeEventDialog}
        action={() => {}}
      />
      <Schedular openDialog={openDialog} />
    </div>
  );
};

export default schedular;
