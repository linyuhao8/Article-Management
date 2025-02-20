export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage);
  };

  return (
    <div className="flex justify-center space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded"
      >
        Previous
      </button>
      <span className="px-4 py-2">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded"
      >
        Next
      </button>
    </div>
  );
}
