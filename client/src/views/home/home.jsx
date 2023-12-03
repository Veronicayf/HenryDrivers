import Cards from "../../components/Cards/cards";
import Filters from "../../components/Filters/filters";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.homeBackground}>
      <Filters />
      <Cards />
    </div>
  );
};

export default Home;
