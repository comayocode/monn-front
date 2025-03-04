import leftNav from '@/assets/icons/left-nav.svg';
import rightNav from '@/assets/icons/right-nav.svg';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  const maxVisiblePages = 7; // Número fijo de botones
  const pages = [];

  if (totalPages <= maxVisiblePages) {
    // Si hay pocas páginas, mostramos todas sin '...'
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    const sidePages = Math.floor((maxVisiblePages - 3) / 2); // Botones a cada lado del actual

    if (currentPage <= sidePages + 2) {
      // Cerca del inicio
      pages.push(...Array.from({ length: maxVisiblePages - 2 }, (_, i) => i + 1));
      pages.push('...', totalPages);
    } else if (currentPage >= totalPages - sidePages - 1) {
      // Cerca del final
      pages.push(1, '...');
      pages.push(...Array.from({ length: maxVisiblePages - 2 }, (_, i) => totalPages - (maxVisiblePages - 3) + i));
    } else {
      // En el medio
      pages.push(1, '...');
      pages.push(...Array.from({ length: maxVisiblePages - 4 }, (_, i) => currentPage - sidePages + i));
      pages.push('...', totalPages);
    }
  }

  return (
    <div className="pagination">
      <button
        className="pagination__button pagination__button--prev"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        aria-label="Página anterior"
      >
        <img className="pagination__button-img" src={leftNav} alt="Anterior" />
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          className={`pagination__button ${page === currentPage ? 'pagination__button--active' : ''}`}
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
        aria-label="Página siguiente"
      >
        <img className="pagination__button-img" src={rightNav} alt="Siguiente" />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
};

export default Pagination;
