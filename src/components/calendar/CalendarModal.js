import React, { useEffect, useState } from "react";

import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";

import Modal from "react-modal";
import { customStyles } from "../../helpers/modal-custom-styles";
import { useForm } from "../../hooks/useForm";
import { doUiCloseModal } from "../../state/actions/uiActions";
import { doEventsAddNewEvent, doEventsCleanActiveEvent, doEventsUpdateEvent } from "../../state/actions/eventsActions";


Modal.setAppElement("#root");

const startDate = moment().minutes(0).seconds(0).add(1, 'hours');
const endDate = startDate.clone().add(1, 'hours');

const initialEvent = {
  // user configurable
  title:'',
  start: startDate.toDate(),
  end: endDate.toDate(),
  // additional
  notes: '',
  bgColor: '#367cf7',
  textColor: '#ffffff',
  // no user configurable
  id: '',
  user: {
    uid: '',
    name: ''
  },
}


export const CalendarModal = () => {

  // hooks
  const { formValues, setFormValues, handleInputChange, resetForm } = useForm( initialEvent );
  const { title, notes, start, end, bgColor, textColor } = formValues;
  const [isValidTitle, setIsValidTitle] = useState(true);
  const { isModalOpen } = useSelector( state => state.ui );
  const { activeEvent } = useSelector( state => state.events );
  const dispatch = useDispatch();
  
  useEffect(() => {
    if( activeEvent ) {
      setFormValues( activeEvent );
    } else {
      setFormValues( initialEvent );
    }
  }, [ activeEvent, setFormValues ]);


  // functions
  const closeModal = () => {
    dispatch( doUiCloseModal() );
    dispatch( doEventsCleanActiveEvent() );
    resetForm( initialEvent );
  };

  const handleStartDateChange = ( e ) => {
    setFormValues({
      ...formValues,
      start: e,
    });
  }

  const handleEndDateChange = ( e ) => {
    setFormValues({
      ...formValues,
      end: e,
    });
  }

  const handleFormSubmit = ( e ) => {
    e.preventDefault();
    
    // validations
    //TODO: validation error when date are equals, when configure the start date
    if( moment(start).isSameOrAfter( moment(end)) ) {
      Swal.fire('Error', 'The end date must be greater than the start date', 'error');
      return;
    }

    if( title.trim().length < 2 ) {
      setIsValidTitle( false );
      return;
    }
    
    // send form

    if( !activeEvent ) {
      dispatch( doEventsAddNewEvent({
        ...formValues,
        id: (new Date().getTime()).toString(),
        user: {
          name: 'Pedro',
          uid: 'asjfjl2j32lk3lrj32rlj',
        }
      }));
    } else {
      dispatch( doEventsUpdateEvent({
        ...formValues,
      }))
    }

    setIsValidTitle( true );
    closeModal();
  }

  return (
    <div>
      <Modal
        isOpen={ isModalOpen }
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        // contentLabel="Example Modal"
        // additional
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
      >
        <h1> { activeEvent ? 'Edit Event': 'New Event'} </h1>
        <hr />
        <form 
          className="container"
          onSubmit={ handleFormSubmit }
        >
          <div className="form-group">
            <label> Start Datetime</label>
            <DateTimePicker 
              className="form-control"
              format="dd/MM/y h:mm a"
              onChange={ handleStartDateChange } 
              value={ start } 
            />
          </div>

          <div className="form-group">
            <label> End Datetime</label>
            <DateTimePicker 
              className="form-control"
              format="dd/MM/y h:mm a"
              onChange={ handleEndDateChange } 
              value={ end } 
            />
          </div>

          <hr />
          <div className="form-group">
            <label>Title and Notes</label>
            <input
              type="text"
              className={`form-control ${ !isValidTitle && 'is-invalid'}`}
              placeholder="Título del evento"
              autoComplete="off"
              name="title"
              value={ title }
              onChange={ handleInputChange }
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={ notes }
              onChange={ handleInputChange }
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <div className="row form-group">
            <div className="col-6">
              <label 
                htmlFor="exampleColorInput" 
                className="form-label"
              >
                Background Color
              </label>
              <input 
                type="color" 
                className="form-control form-control-color" id="exampleColorInput" 
                title="Choose your color" 
                name="bgColor"
                value={ bgColor }
                onChange={ handleInputChange }
              />
            </div>
            <div className="col-6">
              <label 
                htmlFor="exampleColorInput" 
                className="form-label"
              >
                Text Color
              </label>
              <input 
                type="color" 
                className="form-control form-control-color" id="exampleColorInput" 
                title="Choose your color" 
                name="textColor"
                value={ textColor }
                onChange={ handleInputChange }
              />
            </div>

          </div>

          <button 
            type="submit" 
            className="btn btn-outline-primary btn-block"
          >
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};
