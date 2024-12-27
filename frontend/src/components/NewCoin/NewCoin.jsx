import style from "./newCoin.module.css";
import imgTemplate from "../../assets/svg/imageTemplate.svg";
import { Link } from "react-router-dom";
const NewCoin = () => {
  return (
    <div className={style.newCoin}>
      <img src={imgTemplate} alt="" />
      <Link to={"/newcoin"}>Add new coin</Link>
    </div>
  );
};

export default NewCoin;
