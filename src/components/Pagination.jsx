import React from "react";
import "/src/styles/Pagination.css";

const Pagination = ({ totalNotes, notesPerPage, currentPage, onChangePage }) => {
  const totalPages = Math.ceil(totalNotes / notesPerPage);

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onChangePage("prev")}
        className="pagination-btn"
      >
        Previous
      </button>
      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onChangePage("next")}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
