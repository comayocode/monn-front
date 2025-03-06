import editIcon from '@/assets/icons/edit-form.svg';
import deleteIcon from '@/assets/icons/delete.svg';
import PropTypes from 'prop-types';

const TableActions = ({ onEdit, onDelete }) => {
  return (
    <div className='table__actions'>
      <button className='table__button table__button--edit' aria-label='Editar' onClick={onEdit}>
        <img className='table__button-img' src={editIcon} alt='Editar' />
      </button>
      <button
        className='table__button table__button--delete'
        aria-label='Editar'
        onClick={onDelete}
      >
        <img className='table__button-img' src={deleteIcon} alt='Eliminar' />
      </button>
    </div>
  );
};

TableActions.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TableActions;
