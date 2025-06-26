import PropTypes from 'prop-types';
import TableActions from './TableActions';

// Acceder a un valor anidado en un objeto usando una cadena de claves
const getNestedValue = (obj, keyPath) => {
  return keyPath.split('.').reduce((acc, key) => acc?.[key], obj);
};

const TableRow = ({ row, columns, onEdit, onDelete, onView }) => {
  return (
    <tr className='table__row'>
      {columns.map((col) => (
        <td key={`${row.id}-${col.key}`} className='table__cell'>
          {col.key === 'pic' ? (
            <img
              src={getNestedValue(row, col.key)}
              alt='Perfil'
              className='table__profile-pic'
            />
          ) : col.key === '2fa' ? (
            getNestedValue(row, col.key) ? (
              'Sí'
            ) : (
              '-'
            )
          ) : col.key === 'actions' ? (
            <TableActions
              {...(onEdit ? { onEdit: () => onEdit(row) } : {})}
              {...(onDelete ? { onDelete: () => onDelete(row) } : {})}
              {...(onView ? { onView: () => onView(row) } : {})}
            />
          ) : (
            getNestedValue(row, col.key)
          )}
        </td>
      ))}
    </tr>
  );
};

TableRow.propTypes = {
  row: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
};

export default TableRow;
