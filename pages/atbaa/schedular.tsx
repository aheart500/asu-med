import React, { useState, useRef, useEffect } from "react";
import DnDCalendar, {
  FalseEvent,
  localizer,
} from "../../components/DnDCalendar";

import { Calendar, Event, Views } from "react-big-calendar";

const schedular = () => {
  const [events, setEvents] = useState<any>([
    FalseEvent,
    { ...FalseEvent, color: "green", id: 2 },
  ]);

  const [view, setView] = useState<any>(Views.WEEK);
  const [date, setDate] = useState(new Date());

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
  const newEvent = (_event) => {};
  return (
    <div>
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
        onSelectSlot={newEvent}
      />
    </div>
  );
};

export default schedular;
