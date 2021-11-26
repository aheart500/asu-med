import React, { useState } from "react";
import DnDCalendar, { FalseEvent, localizer } from "../DnDCalendar";
import { Views, SlotInfo, stringOrDate } from "react-big-calendar";
import {
  openDialogFunction,
  SCHEDULAR_HEADER_HEIGHT,
} from "../../pages/[familyName]/schedular";
interface SchedularProps {
  openDialog: openDialogFunction;
  events: any;
  resizeEvent: (ev: any) => void;
  moveEvent: (ev: any) => void;
}
const Schedular = ({
  openDialog,
  events,
  resizeEvent,
  moveEvent,
}: SchedularProps) => {
  const [view, setView] = useState<any>(Views.MONTH);
  const [date, setDate] = useState<stringOrDate>(new Date());

  const onSelectSlot = (slot: SlotInfo) => {
    if (slot.action === "doubleClick" || slot.action === "select") {
      if (view === Views.MONTH || view === Views.WEEK) {
        setView(Views.DAY);
        setDate(slot.start);
      } else {
        openDialog("slot", slot);
      }
    }
  };
  const onSelectEvent = (event: any) => {
    openDialog("event", event);
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
      style={{ height: `calc(100vh - ${SCHEDULAR_HEADER_HEIGHT}px )` }}
      popup
      onEventDrop={moveEvent}
      onEventResize={resizeEvent}
      onSelectSlot={onSelectSlot}
      onDoubleClickEvent={onSelectEvent}
      handleDragStart={() => null}
      longPressThreshold={1}
    />
  );
};

export default Schedular;
