import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCartItems, removeCartItem } from "../../coins/cart";
import style from "./cart.module.css";
import Header from "../../components/Header/Header";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.cart);
  //   const [sum, setSum] = useState(0);
  useEffect(() => {
    dispatch(fetchCartItems(1));
  }, [dispatch]);

  const handleRemoveFromCart = (coinId) => {
    dispatch(removeCartItem({ userId: 1, coinId })).then(() => {
      dispatch(fetchCartItems(1));
    });
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={style.cartContainer}>
      <Header name={"Shopping cart"} />
      {items.length === 0 ? (
        <div className={style.emptyCart}>
          <p>Your cart is empty.</p>
          <button className={style.empty} onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className={style.cartLists}>
          {items.map((item) => (
            <div className={style.cartList} key={item.CoinID}>
              <div className={style.left}>
                <img src={item.FrontImageURL} alt={item.Name} />
                <div className={style.info}>
                  <h3>{item.Name}</h3>
                  <p>{item.Price} $</p>
                </div>
              </div>
              <button
                className={style.remove}
                onClick={() => handleRemoveFromCart(item.CoinID)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className={style.total}>
            Total:
            {items
              .reduce((sum, item) => sum + Number(item.Price), 0)
              .toFixed(2)}{" "}
            $
          </div>
          <button className={style.back} onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
