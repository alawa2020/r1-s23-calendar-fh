import { types } from "../types/types";

export const doEventsActivateEvent = ( event ) => ({
  type: types.eventsActivateEvent,
  payload: event,
});

export const doEventsCleanActiveEvent = () => ({
  type: types.eventsCleanActiveEvent,
});

export const doEventsAddNewEvent = ( event ) => ({
  type: types.eventsAddNewEvent,
  payload: event,
});

export const doEventsUpdateEvent = ( event ) => ({
  type: types.eventsUpdateEvent,
  payload: event,
});

export const doEventsDeleteEvent = () => ({
  type: types.eventsDeleteEvent,
});