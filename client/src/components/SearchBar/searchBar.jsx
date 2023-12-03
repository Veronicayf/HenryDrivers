import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchName } from "../../redux/actions/actions";
import style from "./style/searchBar.module.css";
import { setPage } from "../../redux/actions/actions";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [nameToFilter, setNameToFilter] = useState("");

  const handleSearch = () => {
    if (!nameToFilter || !isNaN(nameToFilter))
      return alert("Enter a valid name");
    dispatch(searchName(nameToFilter));
    dispatch(setPage(1));
  };

  const handleChange = (event) => {
    setNameToFilter(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={style.containerSearch}>
      <input
        type="text"
        value={nameToFilter}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder="Write a name"
        className={style.inputSearch}
      />
      <button
        onClick={handleSearch}
        // className={`${style.btnSearch} btn btnPrimary`}
        className={style.botonSeach}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
