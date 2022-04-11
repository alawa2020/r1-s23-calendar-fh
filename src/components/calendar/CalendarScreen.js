import React, { useState } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { useDispatch } from 'react-redux';
import { doUiOpenModal } from '../../state/actions/uiActions';


const localizer = momentLocalizer(moment);

const events = [
  {
    title:'Mel\'s birthday',
    start: moment().toDate(),
    end: moment().add(1, 'hours').toDate(),
    // additional
    notes: 'buy cake',
    user: {
      uid: '1fa34dsfd23',
      name: 'Fernando'
    },
    bgColor: '#7DFF00',
    textColor: '#000000',
  }
]


export const CalendarScreen = () => {

  //? HOOKS
  const [lastView, setLastView] = useState(
    localStorage.getItem('last-view-r1') || 'month'
  );

  const dispatch = useDispatch();

  //? FUNCTIONS

  // eventos
  const onViewChange = ( event ) => {
    setLastView( event );
    localStorage.setItem('last-view-r1', event );
  }

  const onSelectEvent = ( event ) => {
    console.log('onselect');
  }

  const onDoubleClickEvent = ( event ) => {
    console.log( 'onDoubleClick' );
    dispatch( doUiOpenModal() );
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
        onView={ onViewChange }
        view={ lastView }
        eventPropGetter={ eventPropGetter }
        messages={ messages }
        components={{
          event: CalendarEvent,
        }}
        onSelectEvent={ onSelectEvent }
        onDoubleClickEvent= { onDoubleClickEvent }
      />

      <CalendarModal />
    </div>
  )
}
