import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getId, resetDetail } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";
import style from "./style/detail.module.css";

const Detail = () => {
  const driver = useSelector((state) => state.detail);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getId(id));
    return () => {
      dispatch(resetDetail());
    };
  }, [id, dispatch]);
  if (Object.values(driver).length === 0) {
    return (
      <div>
        <p>Driver not found</p>
      </div>
    );
  }
 
  return (
    <div className={style.detailContainer}>
        
        <div className={style.detail}>

          <div>
            <img src={driver.image} alt="" className={style.image} />
          </div>

          <div className={style.detailText}>
            <h2>{driver.forename} {driver.surname}</h2>
            <h3>Id: {driver.id}</h3>
            <h3>Nationality: {driver.nationality}</h3>
            <h3>Birthday: {driver.birthday}</h3>
            <h3>
              Teams:{" "}
              {driver.teams
                ? driver.teams
                : driver.teamName
                ? driver.teamName
                : "No teams"}
            </h3>
          </div>

        </div>

        <div className={style.detailDescription}>
          <h3>Description:{" "}</h3>
          <p>
            {driver.description ? driver.description : "No description"}
          </p>
        </div>

    </div>
  );
};

export default Detail;
