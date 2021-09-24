import React from "react";
import "./Pagination.css";

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
              <a
                className="page-link"
                onClick={() => paginate(1)}
                aria-label="Previous"
              >
                <span aria-hidden="true">«</span>
              </a>
            </li>
          )}
          {pageNumbers.map(
            (number) =>
              currentPage > number - 3 &&
              currentPage < number + 3 && (
                <li key={number} className="page-item">
                  <a
                    onClick={() => paginate(number)}
                    className={
                      currentPage === number
                        ? "page-link selected"
                        : "page-link"
                    }
                  >
                    {number}
                  </a>
                </li>
              )
          )}
          {currentPage !== Math.ceil(totalItems / ItemsPerPage) && (
            <li
              className="page-item"
              key={Math.ceil(totalItems / ItemsPerPage)}
            >
              <a
                className="page-link"
                onClick={() => paginate(Math.ceil(totalItems / ItemsPerPage))}
                aria-label="Next"
              >
                <span aria-hidden="true">»</span>
              </a>
            </li>
          )}
        </ul>
      </nav>
    )
  );
};

export default Pagin;
