import Header from "../../../components/Header/Header";
import Login from "../../../components/Login/Login";
import style from "./adminPanelLogin.module.css";
const AdminPanelLogin = () => {
  return (
    <div className={style.adminPanelLogin}>
      <Header name={"Admin Panel"} />
      <Login />
    </div>
  );
};

export default AdminPanelLogin;
