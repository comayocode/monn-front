import PropTypes from 'prop-types';
import TableActions from './TableActions';

const TableRow = ({ row, columns }) => {
  return (
    <tr className='table__row'>
      {columns.map((col) => (
        <td key={`${row.id}-${col.key}`} className='table__cell'>
          {col.key === 'pic' ? (
            <img
              src={row[col.key]}
              alt='Perfil'
              className='table__profile-pic'
            />
          ) : col.key === '2fa' ? (
            row[col.key] ? (
              'Sí'
            ) : (
              '-'
            )
          ) : col.key === 'actions' ? (
            <TableActions />
          ) : (
            row[col.key]
          )}
        </td>
      ))}
    </tr>
  );
};

TableRow.propTypes = {
  row: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
};

export default TableRow;
