/* eslint-disable react/prop-types */
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const MyPagination = ({ totalPages, currentPage, handleCurrentPage }) => {
  return (
    <>
      <Pagination aria-label="Page navigation example" size="md">
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink onClick={() => handleCurrentPage(1)}>
            First
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink onClick={() => handleCurrentPage(currentPage - 1)}>
            Previous
          </PaginationLink>
        </PaginationItem>
        {/*  pagination buttons */}
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index} active={index + 1 === currentPage}>
            <PaginationLink onClick={() => handleCurrentPage(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink onClick={() => handleCurrentPage(currentPage + 1)}>
            Next
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink onClick={() => handleCurrentPage(totalPages)}>
            Last
          </PaginationLink>
        </PaginationItem>
      </Pagination>
      <div>
        Current Page: {currentPage} of {totalPages}
      </div>
    </>
  );
};

export default MyPagination;
