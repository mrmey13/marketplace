import React from "react";

const Pagin = ({ ItemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / ItemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    totalItems > 0 && (
      <nav aria-label="Pagination">
        <ul className="pagination">
          {currentPage !== 1 && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => paginate(1)}
                aria-label="Previous"
              >
                <span aria-hidden="true">«</span>
              </button>
            </li>
          )}
          {pageNumbers.map(
            (number) =>
              currentPage > number - 3 &&
              currentPage < number + 3 && (
                <li
                  key={number}
                  className={
                    currentPage === number ? "page-item active" : "page-item"
                  }
                >
                  <button
                    onClick={() => paginate(number)}
                    className="page-link"
                  >
                    {number}
                  </button>
                </li>
              )
          )}
          {currentPage !== Math.ceil(totalItems / ItemsPerPage) && (
            <li
              className="page-item"
              key={Math.ceil(totalItems / ItemsPerPage)}
            >
              <button
                className="page-link"
                onClick={() => paginate(Math.ceil(totalItems / ItemsPerPage))}
                aria-label="Next"
              >
                <span aria-hidden="true">»</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    )
  );
};

export default Pagin;