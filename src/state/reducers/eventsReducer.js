import moment from 'moment';
import { types } from '../types/types';

const initialState = {
  events: [
    {
      title:'Mel\'s birthday',
      start: moment().toDate(),
      end: moment().add(1, 'hours').toDate(),
      // additional
      id: '23r2e24ewdwe2',
      notes: 'buy cake',
      user: {
        uid: '1fa34dsfd23',
        name: 'Fernando'
      },
      bgColor: '#7DFF00',
      textColor: '#000000',
    }
  ],
  activeEvent: null,
}

export const eventsReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    
    case types.eventsActivateEvent:
      return {
        ...state,
        activeEvent: action.payload,
      }

    case types.eventsCleanActiveEvent:
      return {
        ...state,
        activeEvent: null,
      }

    case types.eventsAddNewEvent:
      return {
        ...state,
        events: [ ...state.events, {...action.payload} ],
      }
  
    case types.eventsUpdateEvent:
      return {
        ...state,
        events: state.events.map( event => (
          event.id === action.payload.id ? {...action.payload} : event
        )),
      }

    case types.eventsDeleteEvent:
      return {
        ...state,
        events: state.events.filter( event => event.id !== state.activeEvent.id ),
        activeEvent: null,
      }
    default:
      return state;
  }
}