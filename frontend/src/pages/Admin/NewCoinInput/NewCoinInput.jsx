import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./newCoinInput.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetails } from "../../../coins/coin";

const NewCoinInput = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { coin } = useSelector((state) => state.details);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    composition: "",
    quality: "",
    denomination: "",
    year: "",
    weight: "",
    price: "",
    shortDescription: "",
    longDescription: "",
    frontImg: "",
    backImg: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      dispatch(fetchCoinDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (isEdit && coin && Object.keys(coin).length > 0) {
      setFormData({
        name: coin.Name || "",
        country: coin.IssuingCountry || "",
        composition: coin.Composition || "",
        quality: coin.Quality || "",
        denomination: coin.Denomination || "",
        year: coin.Year || "",
        weight: coin.Weight || "",
        price: coin.Price || "",
        shortDescription: coin.ShortDescription || "",
        longDescription: coin.LongDescription || "",
        frontImg: coin.FrontImageURL || "",
        backImg: coin.BackImageUrl || "",
      });
    }
  }, [coin, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Coin name is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.composition)
      newErrors.composition = "Metal composition is required.";
    if (!formData.quality) newErrors.quality = "Quality is required.";
    if (!formData.denomination)
      newErrors.denomination = "Face value is required.";
    if (!formData.year || isNaN(formData.year))
      newErrors.year = "Valid year is required.";
    if (!formData.weight || isNaN(formData.weight))
      newErrors.weight = "Valid weight is required.";
    if (!formData.price || isNaN(formData.price))
      newErrors.price = "Valid price is required.";
    if (!formData.shortDescription)
      newErrors.shortDescription = "Short description is required.";
    if (!formData.longDescription)
      newErrors.longDescription = "Long description is required.";
    if (!formData.frontImg)
      newErrors.frontImg = "Obverse image link is required.";
    if (!formData.backImg)
      newErrors.backImg = "Reverse image link is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const url = id
        ? `http://localhost:3000/coins/${id}`
        : "http://localhost:3000/coins";
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEdit ? "update" : "add"} the coin.`);
      }

      const result = await response.json();
      console.log(`Coin ${isEdit ? "updated" : "added"} successfully:`, result);

      navigate("/admin");
    } catch (error) {
      console.error(`Error ${isEdit ? "updating" : "adding"} coin:`, error);
    }
  };

  return (
    <form className={style.input} onSubmit={handleSubmit}>
      <div className={style.first}>
        <div className={style.name}>
          <label htmlFor="name">Coin name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className={style.error}>{errors.name}</span>}
        </div>
        <div className={style.value}>
          <label htmlFor="denomination">Face value</label>
          <input
            type="text"
            name="denomination"
            value={formData.denomination}
            onChange={handleChange}
          />
          {errors.denomination && (
            <span className={style.error}>{errors.denomination}</span>
          )}
        </div>
        <div className={style.year}>
          <label htmlFor="year">Year of issue</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
          {errors.year && <span className={style.error}>{errors.year}</span>}
        </div>
        <div className={style.price}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <span className={style.error}>{errors.price}</span>}
        </div>
        <div className={style.country}>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          {errors.country && (
            <span className={style.error}>{errors.country}</span>
          )}
        </div>
        <div className={style.metal}>
          <label htmlFor="composition">Metal</label>
          <input
            type="text"
            name="composition"
            value={formData.composition}
            onChange={handleChange}
          />
          {errors.composition && (
            <span className={style.error}>{errors.composition}</span>
          )}
        </div>
      </div>
      <div className={style.second}>
        <div className={style.shortDesc}>
          <label htmlFor="shortDescription">Short description</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
          />
          {errors.shortDescription && (
            <span className={style.error}>{errors.shortDescription}</span>
          )}
        </div>
        <div className={style.longDesc}>
          <label htmlFor="longDescription">Long description</label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
          />
          {errors.longDescription && (
            <span className={style.error}>{errors.longDescription}</span>
          )}
        </div>
        <div className={style.quality}>
          <label htmlFor="quality">Quality of coin</label>
          <input
            type="text"
            name="quality"
            value={formData.quality}
            onChange={handleChange}
          />
          {errors.quality && (
            <span className={style.error}>{errors.quality}</span>
          )}
        </div>
        <div className={style.weight}>
          <label htmlFor="weight">Weight</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
          {errors.weight && (
            <span className={style.error}>{errors.weight}</span>
          )}
        </div>
      </div>
      <div className={style.third}>
        <div className={style.frontImg}>
          <label htmlFor="frontImg">Link to obverse image</label>
          <input
            type="text"
            name="frontImg"
            value={formData.frontImg}
            onChange={handleChange}
          />
          {errors.frontImg && (
            <span className={style.error}>{errors.frontImg}</span>
          )}
        </div>
        <div className={style.backImg}>
          <label htmlFor="backImg">Link to reverse image</label>
          <input
            type="text"
            name="backImg"
            value={formData.backImg}
            onChange={handleChange}
          />
          {errors.backImg && (
            <span className={style.error}>{errors.backImg}</span>
          )}
        </div>
        <div className={style.buttons}>
          <button className={style.submit} type="submit">
            {isEdit ? "Update Coin" : "Add Coin"}
          </button>
          <Link className={style.submit} onClick={() => navigate(-1)}>
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
};

export default NewCoinInput;
