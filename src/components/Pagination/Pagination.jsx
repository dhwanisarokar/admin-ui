import React from "react";
import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";
import "./Pagination.css";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  setCurrentPage,
}) {
  // Pagination buttons
  function getPageNumbersBtn() {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          id={currentPage === i ? "active" : ""}
          className="page-numbers"
          key={i}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  }

  const pageNumbers = getPageNumbersBtn();

  return (
    <div className="pagination-container">
      <button
        className="first-page"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      >
        <FaAngleLeft />
      </button>
      <button
        className="previous-page"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <FaAnglesLeft />
      </button>
      {pageNumbers}
      <button
        className="next-page"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <FaAnglesRight />
      </button>
      <button
        className="last-page"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(totalPages)}
      >
        <FaAngleRight />
      </button>
    </div>
  );
}
