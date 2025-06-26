import editIcon from '@/assets/icons/edit-form.svg';
import deleteIcon from '@/assets/icons/delete.svg';
import viewIcon from '@/assets/icons/on-view.svg';
import PropTypes from 'prop-types';

const TableActions = ({ onEdit, onDelete, onView }) => {
  return (
    <div className='table__actions'>
      {onEdit && (
        <button
          className='table__button table__button--edit'
          aria-label='Editar'
          onClick={onEdit}
        >
          <img className='table__button-img' src={editIcon} alt='Editar' />
        </button>
      )}
      {onView && (
        <button
          className='table__button table__button--view'
          aria-label='Ver'
          onClick={onView}
        >
          <img className='table__button-img' src={viewIcon} alt='Ver' />
        </button>
      )}
      {onDelete && (
        <button
          className='table__button table__button--delete'
          aria-label='Eliminar'
          onClick={onDelete}
        >
          <img className='table__button-img' src={deleteIcon} alt='Eliminar' />
        </button>
      )}
    </div>
  );
};

TableActions.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
};

export default TableActions;
