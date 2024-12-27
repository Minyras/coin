import Header from "../../components/Header/Header";
import InputField from "../../components/InputField/InputField";
import style from "./coinList.module.css";
import CoinLists from "../../components/CoinLists/CoinLists";
const CoinList = () => {
  return (
    <div className={style.coinList}>
      <Header name={"List of the coins"} />
      <InputField />
      <CoinLists />
    </div>
  );
};

export default CoinList;
