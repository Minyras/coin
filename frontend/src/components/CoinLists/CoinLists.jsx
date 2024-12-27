/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import style from "./coinLists.module.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchFilteredCoins } from "../../coins/coin";
import { fetchCoinsByCategory, searchCoinsByName } from "../../coins/list";
// import arrowLeft from "../../assets/svg/arrowwLeft.svg";
// import arrowRight from "../../assets/svg/arrowRight.svg";

const CoinLists = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { coins, loading, error } = useSelector((state) => state.list);
  console.log(coins);
  // const { total } = useSelector((state) => state.list);
  // const [page, setPage] = useState(1);
  const { filter } = useParams();
  // const limit = 6;

  // useEffect(() => {
  //   dispatch(fetchPaginatedCoinsByList({ filter, page, limit }));
  // }, [dispatch, page]);
  useEffect(() => {
    const filters = Object.fromEntries([...searchParams]);
    if (Object.keys(filters).length > 0) {
      dispatch(fetchFilteredCoins(filters));
    } else if (filter) {
      if (isNaN(filter)) {
        dispatch(searchCoinsByName(filter));
      } else {
        dispatch(fetchCoinsByCategory(filter));
      }
    }
  }, [dispatch, searchParams, filter]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // const handleNextPage = () => {
  //   if (page * limit < total) setPage(page + 1);
  // };

  // const handlePrevPage = () => {
  //   if (page > 1) setPage(page - 1);
  // };

  return (
    <div className={style.container}>
      <div className={style.coinLists}>
        {coins.length > 0 ? (
          coins.map((coin) => (
            <Link
              to={`/details/${coin.CoinId}`}
              key={coin.CoinId}
              className={style.coinList}
            >
              <img src={coin.FrontImageURL} alt={coin.Name} />
              <img src={coin.BackImageUrl} alt="" />
              <div className={style.description}>
                <h4>{coin.Name}</h4>
                <p>{coin.ShortDescription}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No coins found for {filter}.</p>
        )}
      </div>
      {/* <div className={style.pagination}>
        <button onClick={handlePrevPage} disabled={page === 1}>
          <img src={arrowLeft} alt="" />
        </button>
        <span>{page}</span>
        <button onClick={handleNextPage} disabled={page * limit >= total}>
          <img src={arrowRight} alt="" />
        </button>
      </div> */}
    </div>
  );
};

export default CoinLists;
