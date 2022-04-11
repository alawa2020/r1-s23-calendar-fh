import React from 'react'
import { useDispatch } from 'react-redux'
import { doEventsCleanActiveEvent } from '../../state/actions/eventsActions';
import { doUiOpenModal } from '../../state/actions/uiActions';

export const AddNewFab = () => {

  // hooks
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch( doEventsCleanActiveEvent() );
    dispatch( doUiOpenModal() );
  }
  return (
    <button
      className="btn btn-primary fab"
      onClick={ handleButtonClick }
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}
