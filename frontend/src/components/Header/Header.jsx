/* eslint-disable react/prop-types */
import style from "./header.module.css";

const Header = ({ name }) => {
  return <h1 className={style.header}>{name}</h1>;
};

export default Header;
