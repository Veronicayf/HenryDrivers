import style from './style/pagination.module.css';

function Pagination({handleNext, handlePrev, totalPages, page} ) {
  return (
    <div className={style.containerPag}>
      {page > 1 && (
        <button className={style.buttonPag} onClick={handlePrev}> Previous</button>
      )}
      <span className={style.pageNumber}>Page {page} of {totalPages}</span>
      {page !== totalPages && (
        <button className={style.buttonPag} onClick={handleNext}>
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
