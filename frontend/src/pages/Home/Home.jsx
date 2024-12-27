import { Link } from "react-router-dom";
import CoinCards from "../../components/CoinCards/CoinCards";
import Header from "../../components/Header/Header";
import InputField from "../../components/InputField/InputField";
import style from "./home.module.css";
import arrowDown from "../../assets/svg/arrowDown.svg";
import arrowUp from "../../assets/svg/arrowUp.svg";
import { useEffect, useState } from "react";
import Filter from "../../components/Filter/Filter";
import { getCategories } from "../../coins/category";
import { useDispatch, useSelector } from "react-redux";
import cartSvg from "../../assets/svg/cart.svg";
import { fetchCartItems } from "../../coins/cart";
import userSvg from "../../assets/svg/user.svg";
const Home = () => {
  const [filter, setFilter] = useState(false);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [count, setCount] = useState(0);
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(fetchCartItems(1));
  }, [dispatch]);

  useEffect(() => {
    setCount(items.length);
  }, [items]);
  return (
    <div className={style.home}>
      <div className={style.header}>
        <Header name={"Homepage"} />
        <div className={style.right}>
          <Link className={style.cartContainer} to={"/cart"}>
            <span>{count}</span>
            <img className={style.cart} src={cartSvg} alt="" />
          </Link>
          <Link to={"/userlogin"}>
            <img className={style.user} src={userSvg} alt="" />
          </Link>
        </div>
      </div>
      <InputField />
      <Link onClick={() => setFilter(!filter)}>
        Advenced filter
        {filter ? (
          <img className="arrow" src={arrowUp} alt="" />
        ) : (
          <img className="arrow" src={arrowDown} alt="" />
        )}
      </Link>
      {filter ? <Filter /> : <CoinCards />}
    </div>
  );
};

export default Home;
