import { useSelector } from "react-redux";
import style from "./coinCards.module.css";
import { Link } from "react-router-dom";
import coin from "../../assets/svg/coin.svg";
const CoinCards = () => {
  const { categories } = useSelector((state) => state.category);

  return (
    <div className={style.cards}>
      {categories.map((category) => (
        <div className={style.card} key={category.CategoryId}>
          <h1>{category.Name}</h1>
          <Link to={`/list/${category.CategoryId}`}>Show all</Link>
          <img
            // style={{ width: "200px" }}
            className="coin"
            src={coin}
            alt="coin"
          />
        </div>
      ))}
    </div>
  );
};

export default CoinCards;
