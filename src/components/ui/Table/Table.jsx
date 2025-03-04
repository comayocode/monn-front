import { useState } from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Pagination from './Pagination';

const Table = ({ data, columns, rowsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className='table'>
        <table className='table__content'>
          <TableHeader columns={columns} />
          <tbody className='table__body'>
            {data
              .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} row={row} columns={columns} />
              ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      )}
    </>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number,
};

export default Table;
