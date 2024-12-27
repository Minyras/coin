import { useDispatch, useSelector } from "react-redux";
import style from "./filter.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCoins } from "../../coins/coin";

const Filter = () => {
  const { coins, loading, error } = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    issuingCountry: "",
    metal: "",
    quality: "",
    priceFrom: "",
    priceTo: "",
    yearFrom: "",
    yearTo: "",
  });

  useEffect(() => {
    dispatch(getCoins());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const uniqueCountries = [
    ...new Set(coins?.map((coin) => coin.IssuingCountry)),
  ];
  const uniqueMetals = [...new Set(coins?.map((coin) => coin.Composition))];
  const uniqueQualities = [...new Set(coins?.map((coin) => coin.Quality))];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams(filters).toString();
    navigate(`/filter?${queryParams}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.filter}>
        <div className={style.inputs}>
          <div className={`${style.country} ${style.field}`}>
            <label htmlFor="issuingCountry">Issuing country</label>
            <select
              className={style.select}
              name="issuingCountry"
              id="issuingCountry"
              value={filters.issuingCountry}
              onChange={handleInputChange}
            >
              <option value="">Select Country</option>
              {uniqueCountries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className={`${style.metal} ${style.field}`}>
            <label htmlFor="metal">Metal</label>
            <select
              className={style.select}
              name="metal"
              id="metal"
              value={filters.metal}
              onChange={handleInputChange}
            >
              <option value="">Select Metal</option>
              {uniqueMetals.map((metal, index) => (
                <option key={index} value={metal}>
                  {metal}
                </option>
              ))}
            </select>
          </div>
          <div className={`${style.quality} ${style.field}`}>
            <label htmlFor="quality">Quality of the coin</label>
            <select
              className={style.select}
              name="quality"
              id="quality"
              value={filters.quality}
              onChange={handleInputChange}
            >
              <option value="">Select Quality</option>
              {uniqueQualities.map((quality, index) => (
                <option key={index} value={quality}>
                  {quality}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={style.fromTo}>
          <div className={style.price}>
            <label htmlFor="priceFrom">Price</label>
            <div>
              <div>
                <label htmlFor="priceFrom">from</label>
                <input
                  type="text"
                  id="priceFrom"
                  name="priceFrom"
                  value={filters.priceFrom}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="priceTo">to</label>
                <input
                  type="text"
                  id="priceTo"
                  name="priceTo"
                  value={filters.priceTo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className={style.year}>
            <label htmlFor="yearFrom">Year of issue</label>
            <div>
              <div>
                <label htmlFor="yearFrom">from</label>
                <input
                  type="text"
                  id="yearFrom"
                  name="yearFrom"
                  value={filters.yearFrom}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="yearTo">to</label>
                <input
                  type="text"
                  id="yearTo"
                  name="yearTo"
                  value={filters.yearTo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className={style.submitButton}>
        Apply Filters
      </button>
    </form>
  );
};

export default Filter;
