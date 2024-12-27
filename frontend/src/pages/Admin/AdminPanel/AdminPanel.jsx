import style from "./adminPanel.module.css";

import InputField from "../../../components/InputField/InputField";
import AdminCoinLists from "../../../components/AdminCoinLists/AdminCoinLists";
import NewCoin from "../../../components/NewCoin/NewCoin";
import Header from "../../../components/Header/Header";

const AdminPanel = () => {
  return (
    <div className={style.adminPanel}>
      <Header name={"Admin Panel"} />
      <InputField />
      <AdminCoinLists />
      <NewCoin />
    </div>
  );
};

export default AdminPanel;
