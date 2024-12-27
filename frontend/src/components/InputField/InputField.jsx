import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchCoinsByName } from "../../coins/list";
import style from "./inputField.module.css";

const InputField = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      dispatch(searchCoinsByName(search));
      navigate(`/list/${search}`);
    } else {
      setError("Please fill the input");
    }
    setSearch("");
  };

  return (
    <form className={style.searchForm} onSubmit={handleSearch}>
      <label htmlFor="searchInput">Input field</label>
      <div className={style.buttons}>
        <input
          // id="searchInput"
          className={style.input}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onMouseDown={() => setError("")}
        />

        <button type="submit" className={style.searchButton}>
          Search
        </button>
      </div>
      <p className={style.error}>{error}</p>
    </form>
  );
};

export default InputField;
