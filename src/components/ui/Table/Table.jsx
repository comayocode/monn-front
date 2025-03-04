import { useState } from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import editIcon from '@/assets/icons/edit-form.svg';
import deleteIcon from '@/assets/icons/delete.svg';
import leftNav from '@/assets/icons/left-nav.svg';
import rightNav from '@/assets/icons/right-nav.svg';

const Table = ({ data, columns, rowsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 4;

    for (let i = 1; i <= totalPages; i++) {
      if (i <= maxPagesToShow || i === totalPages || i === currentPage) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return (
      <div className="pagination">
        <button
          className="pagination__button pagination__button--prev"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          <img className="pagination__button-img" src={leftNav} alt="Anterior" />
        </button>

        {pages.map((page, index) => (
          <button
            key={index}
            className={`pagination__button ${
              page === currentPage ? 'pagination__button--active' : ''
            }`}
            onClick={() => typeof page === 'number' && goToPage(page)}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination__button pagination__button--next"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          <img className="pagination__button-img" src={rightNav} alt="Siguiente" />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="table">
        <table className="table__content">
          <thead className="table__head">
            <tr className="table__row">
              {columns.map((col) => (
                <th key={col.key} className="table__header">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="table__body">
            {data
              .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
              .map((row) => {
                return (
                  <tr key={row.id} className="table__row">
                    {columns.map((col) => (
                      <td key={`${row.id}-${col.key}`} className="table__cell">
                        {col.key === 'pic' ? (
                          <img src={row[col.key]} alt="Perfil" className="table__profile-pic" />
                        ) : col.key === '2fa' ? (
                          row[col.key] ? 'Sí' : '-'
                        ) : col.key === 'actions' ? (
                          <div className="table__actions">
                            <button className="table__button table__button--edit">
                              <img className="table__button-img" src={editIcon} alt="Editar" />
                            </button>
                            <button className="table__button table__button--delete">
                              <img className="table__button-img" src={deleteIcon} alt="Eliminar" />
                            </button>
                          </div>
                        ) : (
                          row[col.key]
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && renderPagination()}
    </>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number,
};

export default Table;
