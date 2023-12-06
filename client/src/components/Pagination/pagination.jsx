import style from './style/pagination.module.css';

const Pagination = ({handleNext, handlePrev, totalPages, page} ) => {
  return (

    <div className={style.containerPag}>

      {page > 1 && (
        <button className={style.buttonPag} onClick={handlePrev}> ⇚ Prev </button>)
      }

      <p className={style.pageNumber}>Page {page} of {totalPages}</p>

      {page !== totalPages && (
        <button className={style.buttonPag} onClick={handleNext}>Next ⇛ </button>)
      }

    </div>
  );
}

export default Pagination;
