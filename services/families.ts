import { FacultyFamilies, FamilyEvent } from "../types";
import { APICall } from "./api";

export const GetFamilies = async (familyName?: FacultyFamilies) => {
  const result = await APICall.get(`/families/${familyName ?? ""}`);
  return result.data;
};
export const SaveFamily = async (body: { name: string }) => {
  const result = await APICall.post("/families", body);
  return result.data;
};
export const GetFamilyEvents = async (familyName: FacultyFamilies) => {
  const result = await APICall.get("/families/events/" + familyName);
  return result.data.map((ev: any) => ({
    ...ev,
    start: new Date(ev.start),
    end: new Date(ev.end),
  }));
};
export const SaveEvent = async ({
  body,
  familyId,
}: {
  familyId: string;
  body: Omit<FamilyEvent, "_id" | "family">;
}) => {
  const result = await APICall.post("/families/events/" + familyId, body);
  return result.data;
};
export const UpdateEvent = async ({
  eventId,
  body,
}: {
  eventId: string;
  body: any;
}) => {
  const result = await APICall.patch("/families/events/" + eventId, body);
  return result.data;
};
export const DeleteEvent = async ({ eventId }: { eventId: string }) => {
  const result = await APICall.delete("/families/events/" + eventId);
  return result.data;
};
