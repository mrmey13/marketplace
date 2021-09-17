import React, { useState } from "react";
import "./Pagination.css";
const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  isDark,
  // clicked,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {/* <li className="page-item" style={{ margin: "2px" }}>
          <a onClick={() => paginate(1)} href="#" className="page-link">
            <ion-icon name="play-back-outline"></ion-icon>
          </a>
        </li> */}
        {pageNumbers.map((number) => (
          <li
            // style={
            //   clicked == "true"
            //     ? { backgroundColor: "silver" }
            //     : { backgroundColor: "white" }
            // }
            key={number}
            className={
              currentPage === number ? "page-item active" : "page-item"
            }
          >
            <a
              style={isDark == "true" ? { backgroundColor: "#685F5F" } : null}
              onClick={() => paginate(number)}
              href="#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
        {/* <li className="page-item" style={{ margin: "2px" }}>
          <a
            onClick={() => paginate(pageNumbers.length)}
            href="#"
            className="page-link"
          >
            <ion-icon name="play-forward-outline"></ion-icon>
          </a>
        </li> */}
      </ul>
    </nav>
  );
};

export default Pagination;
