import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";



const PageButton = ({totalPages, setCurrentPage, currentPage}) => {

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return(
    <div className='flex justify-center gap-x-2 mt-4 items-center pb-4'>
        <button
          className='text-white bg-gray-700 p-2 rounded'
          onClick={handleFirstPage}
          disabled={currentPage === 1}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>

        <button
          className='text-white bg-gray-700 p-2 rounded'
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <MdOutlineKeyboardArrowLeft />
        </button>

        <span className='text-white'>
          Página {currentPage} de {totalPages}
        </span>

        <button
          className='text-white bg-gray-700 p-2 rounded'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <MdOutlineKeyboardArrowRight />
        </button>

        <button
          className='text-white bg-gray-700 p-2 rounded'
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>

  );
};

export default PageButton;