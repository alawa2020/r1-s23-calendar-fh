import React, { useState } from "react";

import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";

import Modal from "react-modal";
import { customStyles } from "../../helpers/modal-custom-styles";
import { useForm } from "../../hooks/useForm";
import { doUiCloseModal } from "../../state/actions/uiActions";


Modal.setAppElement("#root");

const startDate = moment().minutes(0).seconds(0).add(1, 'hours');
const endDate = startDate.clone().add(1, 'hours');

const initialEvent = {
  title:'',
  start: startDate.toDate(),
  end: endDate.toDate(),
  // additional
  notes: '',
  user: {
    uid: '',
    name: ''
  },
  bgColor: '',
  textColor: '',
}


export const CalendarModal = () => {

  // hooks
  const { formValues, setFormValues, handleInputChange } = useForm( initialEvent );
  const { title, notes, start, end } = formValues;
  const [isValidTitle, setIsValidTitle] = useState(true);
  const { isModalOpen } = useSelector( state => state.ui );
  const dispatch = useDispatch();
  
  // functions
  const closeModal = () => {
    dispatch( doUiCloseModal() );
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
    
    //TODO: validation error when date are equals, when configure the start date
    if( moment(start).isSameOrAfter( moment(end)) ) {
      Swal.fire('Error', 'The end date must be greater than the start date', 'error');
      return;
    }

    if( title.trim().length < 2 ) {
      setIsValidTitle( false );
      return;
    }
    setIsValidTitle( true );
    alert('event sent!')
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
        <h1> Nuevo evento </h1>
        <hr />
        <form 
          className="container"
          onSubmit={ handleFormSubmit }
        >
          <div className="form-group">
            <label>Fecha y hora inicio</label>
            <DateTimePicker 
              className="form-control"
              onChange={ handleStartDateChange } 
              value={ start } 
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora fin</label>
            <DateTimePicker 
              className="form-control"
              onChange={ handleEndDateChange } 
              value={ end } 
            />
          </div>

          <hr />
          <div className="form-group">
            <label>Titulo y notas</label>
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
