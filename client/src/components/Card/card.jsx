import { Link } from "react-router-dom";
import logo from '../../assets/img/logo.png'
import style from "./style/card.module.css";

const Card = (props) => {
  return (
    <Link to={`/detail/${props.id}`} className={style.link}>

      <div className={style.card}>

        <div className={style.cardHeader}>
          <div className={style.cardHeaderLogo}>
            <img src={logo} alt="" className={style.mainLogo} />
          </div>
        </div>

        <div className={style.det}>
          <h3>{`${props.forename} ${props.surname}`}</h3>
          <p>Birthday: {props.birthday}</p>
          <p>Teams: {props.teams? props.teams : props.teamName}</p>
        </div>

        <div className={style.imageCont}>
          <img
            src={props.image?.url ? props.image?.url : props.image}
            alt={`driver image ${props.forename} ${props.surname}`}
          />
        </div>
        
      </div>
    </Link>
  );
};


export default Card;
