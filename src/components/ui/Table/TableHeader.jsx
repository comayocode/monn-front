import PropTypes from 'prop-types';

const TableHeader = ({ columns }) => {
  return (
    <thead className='table__head'>
      <tr className='table__row'>
        {columns.map((col) => (
          <th key={col.key} className='table__header'>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
};

export default TableHeader;
