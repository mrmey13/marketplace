import React from "react";
import "./Pagination.css";

const Pagination = ({ ItemsPerPage, totalItems, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / ItemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // console.log(currentPage);
  };
  return (
    totalItems > 0 && (
      <nav aria-label="Pagination">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="btn page-link"
              onClick={() => paginate(1)}
              aria-label="Previous"
              disabled={currentPage == 1}
            >
              <span aria-hidden="true">«</span>
            </button>
          </li>
          {pageNumbers.map(
            (number) =>
              currentPage > number - 2 &&
              currentPage < number + 2 && (
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
          <li
            className="page-item"
            key={Math.ceil(totalItems / ItemsPerPage)}
          >
            <button
              className="btn page-link"
              onClick={() => paginate(Math.ceil(totalItems / ItemsPerPage))}
              aria-label="Next"
              disabled={currentPage == Math.ceil(totalItems / ItemsPerPage)}
            >
              <span aria-hidden="true">»</span>
            </button>
          </li>
        </ul>
      </nav>
    )
  );
};

export default Pagination;
