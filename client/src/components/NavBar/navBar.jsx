import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/searchBar";
import style from './style/navBar.module.css';
import logo from "../../assets/img/logo.png";
const NavBar = () => {
  const location = useLocation();

  return (
    <div className={style.navCont}>
      <nav className={style.nav}>
        <div className={style.logoContainer}>
          <img src={logo} className={style.logo} alt="Logo" />
        </div>
        <div className={style.centeredLinks}>
          <Link to="/home" className={style.link}>
            HOME
          </Link>
          <Link to="/create" className={style.link}>
            CREATE DRIVER
          </Link>
        </div>
        <div className={style.searchBarContainer}>
          {location.pathname === "/home" && <SearchBar />}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
