import editIcon from '@/assets/icons/edit-form.svg';
import deleteIcon from '@/assets/icons/delete.svg';

const TableActions = () => {
  return (
    <div className='table__actions'>
      <button className='table__button table__button--edit' aria-label='Editar'>
        <img className='table__button-img' src={editIcon} alt='Editar' />
      </button>
      <button
        className='table__button table__button--delete'
        aria-label='Editar'
      >
        <img className='table__button-img' src={deleteIcon} alt='Eliminar' />
      </button>
    </div>
  );
};

export default TableActions;
