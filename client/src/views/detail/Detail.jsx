// import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getId, resetDetail } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";

import styles from "./Detail.module.css";
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
    <div className={styles.containerDetail}>
      <div className={`${styles.contentDetail} container`}>
        <div className={styles.imageContainer}>
          <img src={driver.image} alt="" className={styles.image} />
        </div>
        <div className={styles.infoContainer}>
          <h3>Name: {driver.forename}</h3>
          <h3>Last name: {driver.surname}</h3>
          <div className={styles.texts}>
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
        <h3>
          Description:{" "}
          {driver.description ? driver.description : "No description"}
        </h3>
      </div>
    </div>
  );
};

export default Detail;
