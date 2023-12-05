import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, setPage } from "../../redux/actions/actions";
import Card from "../Card/card";
import Pagination from "../Pagination/pagination";
import style from "./style/cards.module.css";

const Cards = () => {

  const [perPage, setPerPage] = useState(9);
  const dispatch = useDispatch();

  const { allDrivers, filteredByData, aux, page } = useSelector(
    (state) => state);

  const selectDrivers =
    aux.length > 0
      ? aux
      : filteredByData.length > 0
      ? filteredByData
      : allDrivers;
  const startIndex = (page - 1) * perPage;
  const endIndex = perPage * page;
  const showDrivers = selectDrivers.slice(startIndex, endIndex); 
  const totalPages = Math.ceil(selectDrivers.length / perPage);

   const handleNext = () => {
    if (page !== totalPages) {
      dispatch(setPage(page + 1));
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };
  
  useEffect(() => {
    dispatch(getDrivers());
  }, []);

  return (
    <div className={style.container}>

      <div className={style.cardCont}>
        {showDrivers?.map((driver) => (
          <Card
          key={driver.id}
          id={driver.id}
          forename={driver.name?.forename ? driver.name?.forename : driver.forename}
          surname={driver.name?.surname ? driver.name?.surname : driver.surname}
          birthday={driver.birthday}
          teams={ driver.teamName}
          image={driver.image}
          />
          ))}
      </div>

      <div>
        <Pagination
          handleNext={handleNext}
          handlePrev={handlePrev}
          page={page}
          totalPages={totalPages}
        />
      </div>
          
    </div>
  );
}

export default Cards;
