import React, { useState } from "react";
import { SlotInfo } from "react-big-calendar";
import EventDialog from "../../components/Atbaa/EventDialog";
import Schedular from "../../components/Atbaa/Schedular";
import Head from "next/head";
import differenceInMinutes from "date-fns/differenceInMinutes";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  DeleteEvent,
  GetFamilies,
  GetFamilyEvents,
  SaveEvent,
  UpdateEvent,
} from "../../services/families";
import { GetServerSideProps } from "next";
import { FacultyFamilies, FacultyFamily, FamilyEvent } from "../../types";
import { capitalize } from "../../utils/helperFunctions";

export type openDialogFunction = (
  type: "event" | "slot",
  data: SlotInfo | any
) => void;
export const SCHEDULAR_HEADER_HEIGHT = 140;
const schedular = ({ family }: { family: FacultyFamily }) => {
  const queryClient = useQueryClient();
  const { data: events } = useQuery(
    "familyEvents",
    () => GetFamilyEvents("Atbaa"),
    { initialData: [] }
  );
  const { mutate: saveEvent } = useMutation(SaveEvent, {
    onSuccess: () => queryClient.invalidateQueries("familyEvents"),
  });
  const { mutate: updateEvent } = useMutation(UpdateEvent, {
    onSuccess: () => queryClient.invalidateQueries("familyEvents"),
  });
  const { mutate: deleteEvent } = useMutation(DeleteEvent, {
    onSuccess: () => queryClient.invalidateQueries("familyEvents"),
  });
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const closeEventDialog = () => {
    setEventDialogOpen(false);
    setSelectedEvent(null);
    setSelectedSlot(null);
  };
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const openDialog = (type: "event" | "slot", data: SlotInfo | any) => {
    type === "slot" ? setSelectedSlot(data) : setSelectedEvent(data);
    setEventDialogOpen(true);
  };
  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }
    updateEvent({ eventId: event._id, body: { ...event, start, end } });
  };
  const resizeEvent = ({ event, start, end }) => {
    updateEvent({
      eventId: event._id,
      body: {
        ...event,
        start,
        end,
        duration: Math.abs(differenceInMinutes(start, end)),
      },
    });
  };
  const handleSubmit = (event: any) => {
    if (event._id) {
      updateEvent({ eventId: event._id, body: event });
    } else {
      saveEvent({ familyId: family._id, body: event });
    }
  };
  const handleDelete = (id: string) => deleteEvent({ eventId: id });

  if (!family) return null;

  return (
    <div>
      <Head>
        <title>{family.name} | Schedular</title>
      </Head>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image
          src="/images/atbaa.jpg"
          alt="Atbaa logo"
          width={SCHEDULAR_HEADER_HEIGHT}
          height={SCHEDULAR_HEADER_HEIGHT}
        />
      </div>
      <EventDialog
        open={eventDialogOpen}
        info={selectedSlot || selectedEvent}
        close={closeEventDialog}
        submit={handleSubmit}
        handleDelete={handleDelete}
      />
      <Schedular
        openDialog={openDialog}
        events={events}
        moveEvent={moveEvent}
        resizeEvent={resizeEvent}
      />
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const family = await GetFamilies(
    capitalize(context.query.familyName as string) as FacultyFamilies
  );

  return {
    props: {
      family: family?.[0] ?? null,
    },
  };
};
export default schedular;
