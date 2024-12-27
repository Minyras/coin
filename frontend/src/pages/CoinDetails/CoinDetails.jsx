import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./coinDetails.module.css";
import { fetchCoinDetails, updateViewCount } from "../../coins/coin";
import eyeIcon from "../../assets/svg/eyeIcon.svg";
import { addToCartItem, fetchCartItems } from "../../coins/cart";
const CoinDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coin, loading, error } = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(updateViewCount(id));
  }, [id]);
  useEffect(() => {
    if (id) {
      dispatch(fetchCoinDetails(id));
    }
  }, [dispatch, id]);
  const handleAddToCart = async () => {
    try {
      await dispatch(addToCartItem({ userId: 1, coinId: id }));
      dispatch(fetchCartItems(1));
      navigate(`/cart/1`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={style.coinDetails}>
      <div className={style.images}>
        <img className={style.front} src={coin.FrontImageURL} alt="Front" />
        <img className={style.back} src={coin.BackImageUrl} alt="Back" />
      </div>
      <div className={style.description}>
        <div>
          <div>
            <h1>{coin.Name}</h1>

            <p>{coin.ShortDescription}</p>
            <p>{coin.LongDescription}</p>
          </div>
          <table className={style.descriptionTable}>
            <tbody>
              <tr>
                <td>Issuing Country:</td>
                <td>{coin.IssuingCountry}</td>
              </tr>
              <tr>
                <td>Composition:</td>
                <td>{coin.Composition}</td>
              </tr>
              <tr>
                <td>Quality:</td>
                <td>{coin.Quality}</td>
              </tr>
              <tr>
                <td>Denomination:</td>
                <td>{coin.Denomination}</td>
              </tr>
              <tr>
                <td>Year:</td>
                <td>{coin.Year}</td>
              </tr>
              <tr>
                <td>Weight:</td>
                <td>{coin.Weight} g</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>{coin.Price} $</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={style.down}>
          <div className={style.view}>
            <span>{coin.Views}</span>
            <img src={eyeIcon} alt="" />
          </div>
          <button onClick={handleAddToCart} className={style.addToCartButton}>
            Add to cart
          </button>
          <Link onClick={() => navigate(-1)} className={style.backButton}>
            Back to the list
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
