import "./Pagination.css";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button
          className="btn btn-outline-dark btn-sm me-2 bp"
          onClick={goToPreviousPage}
        >
          <img src="src/assets/left.png" />
        </button>
      )}
      <strong>
        {currentPage} of {totalPages}
      </strong>
      {currentPage < totalPages && (
        <button
          className="btn btn-outline-dark btn-sm ms-2 bp"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <img src="src/assets/right.png" />
        </button>
      )}
    </div>
  );
}
