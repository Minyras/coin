import { useDispatch, useSelector } from "react-redux";
import style from "./adminCoinLists.module.css";
import { useEffect, useState } from "react";
import arrowLeft from "../../assets/svg/arrowwLeft.svg";
import arrowRight from "../../assets/svg/arrowRight.svg";
import { getCoinsWithPagination } from "../../coins/list";
import { Link, useNavigate } from "react-router-dom";
import { deleteCoin } from "../../coins/coin";

const AdminCoinLists = () => {
  const { coins, total } = useSelector((state) => state.list);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 2;
  useEffect(() => {
    dispatch(getCoinsWithPagination({ page, limit }));
  }, [dispatch, page, total]);

  const handleDelete = (coinId) => {
    dispatch(deleteCoin(coinId));
  };

  const handleEdit = (coinId) => {
    navigate(`/newcoin/${coinId}`);
  };

  const handleNextPage = () => {
    if (page * limit < total) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  useEffect(() => {
    dispatch(getCoinsWithPagination({ page, limit }));
  }, [dispatch, page]);

  return (
    <div className={style.lists}>
      {coins.length > 0 ? (
        coins.map((coin) => (
          <div key={coin.CoinId} className={style.coinList}>
            <Link to={`/details/${coin.CoinId}`} className={style.first}>
              <img
                src={coin.FrontImageURL || ""}
                alt={coin.Name}
                className={style.coinImage}
              />
              <div className={style.description}>
                <h4>{coin.Name}</h4>
                <p>{coin.ShortDescription}</p>
              </div>
            </Link>
            <div className={style.buttons}>
              <button
                className={style.edit}
                onClick={() => handleEdit(coin.CoinId)}
              >
                Edit
              </button>
              <button
                className={style.delete}
                onClick={() => handleDelete(coin.CoinId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No coins available.</p>
      )}

      <div className={style.pagination}>
        <button onClick={handlePrevPage} disabled={page === 1}>
          <img src={arrowLeft} alt="" />
        </button>
        <span>{page}</span>
        <button onClick={handleNextPage} disabled={page * limit >= total}>
          <img src={arrowRight} alt="" />
        </button>
      </div>
    </div>
  );
};

export default AdminCoinLists;
