import React, { useState } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import { doUiOpenModal } from '../../state/actions/uiActions';
import { doEventsActivateEvent, doEventsCleanActiveEvent } from '../../state/actions/eventsActions';
import { AddNewFab } from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';


const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

  //? HOOKS
  const [lastView, setLastView] = useState(
    localStorage.getItem('last-view-r1') || 'month'
  );
  const { events, activeEvent } = useSelector( state => state.events );

  const dispatch = useDispatch();

  //? FUNCTIONS

  // eventos
  const onViewChange = ( event ) => {
    setLastView( event );
    localStorage.setItem('last-view-r1', event );
  }

  const onSelectEvent = ( event ) => {
    dispatch( doEventsActivateEvent( event ) );
  }

  const onDoubleClickEvent = ( event ) => {
    dispatch( doUiOpenModal() );
  }

  const onSelectSlot = () => {
    dispatch( doEventsCleanActiveEvent() );
  }

  // estilos
  const eventPropGetter = ( event, start, end, isSelected ) => {
    const style = {
      backgroundColor: event.bgColor,
      color: event.textColor,
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
    }
    return {
      style
    }
  }

  
  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        // additional
        view={ lastView }
        onView={ onViewChange }
        eventPropGetter={ eventPropGetter }
        messages={ messages }
        components={{
          event: CalendarEvent,
        }}
        onSelectEvent={ onSelectEvent }
        onDoubleClickEvent= { onDoubleClickEvent }
        selectable={true}
        onSelectSlot={ onSelectSlot }
      />
      <AddNewFab />
      {
        activeEvent && <DeleteEventFab />
      }
      <CalendarModal />
    </div>
  )
}
