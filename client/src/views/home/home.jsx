import Cards from "../../components/Cards/cards";
import Filters from "../../components/Filters/filters";
import style from "./style/home.module.css";

const Home = () => {
  return (
    <div className={style.homeBackground}>
      <Filters />
      <Cards />
    </div>
  );
};

export default Home;
