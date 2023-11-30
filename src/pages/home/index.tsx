import React from "react";
import style from "./Home.module.scss";
import { Map, Price, WelcomeBlock } from "../../components";
import { fetchProducts } from "../../redux/slice/products";
import { useAppDispatch } from "../../utils/hook";
import ProductCart from "../../components/productCard";

const Home = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className={`${style.root ? style.root : ""} container`}>
      <WelcomeBlock />
      <Price />
      <Map />
      <div className={style.price}></div>
      <div className={style.swiper}></div>
      <div className={style.swiper}></div>
      <div className={style.map}></div>
    </div>
  );
};

export default Home;
