import React, { useState } from "react";
import DnDCalendar, { FalseEvent, localizer } from "../DnDCalendar";
import { Views, SlotInfo, stringOrDate } from "react-big-calendar";

const Schedular = ({ openDialog }: { openDialog: (s: SlotInfo) => void }) => {
  const [events, setEvents] = useState<any>([
    FalseEvent,
    { ...FalseEvent, color: "green", id: 2 },
  ]);

  const [view, setView] = useState<any>(Views.WEEK);
  const [date, setDate] = useState<stringOrDate>(new Date());

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end, allDay }
        : existingEvent;
    });

    setEvents(nextEvents);
  };
  const resizeEvent = ({ event, start, end }) => {
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setEvents(nextEvents);
  };
  const onSelectSlot = (slot: SlotInfo) => {
    if (slot.action === "doubleClick") {
      if (view === Views.MONTH || view === Views.WEEK) {
        setView(Views.DAY);
        setDate(slot.start);
      } else {
        openDialog(slot);
      }
    }
  };
  return (
    <DnDCalendar
      localizer={localizer}
      view={view}
      events={events}
      onView={setView}
      date={date}
      onNavigate={setDate}
      resizable
      selectable
      style={{ height: "100vh" }}
      popup
      onEventDrop={moveEvent}
      onEventResize={resizeEvent}
      onSelectSlot={onSelectSlot}
    />
  );
};

export default Schedular;
