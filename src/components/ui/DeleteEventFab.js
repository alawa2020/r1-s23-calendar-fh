import { useDispatch } from "react-redux"
import Swal from "sweetalert2";

import { doEventsDeleteEvent } from "../../state/actions/eventsActions";


const DeleteEventFab = () => {

  const dispatch = useDispatch();

  const handleButtonDelete = () => {
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch( doEventsDeleteEvent() );
        Swal.fire(
          'Deleted!',
          'The event has been deleted.',
          'success'
        )
      }
    })

  }
  return (
    <button
      type="button"
      className="btn btn-danger fab-danger"
      onClick={ handleButtonDelete }
    >
      <i className="fas fa-trash"></i>
      <span> Delete Event</span>
    </button>
  )
}

export default DeleteEventFab
