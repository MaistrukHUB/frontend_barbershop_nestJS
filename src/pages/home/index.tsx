import React from "react";
import style from "./Home.module.scss";
import {
  BigImgsBlock,
  CartItem,
  Map,
  ProductItemsContainer,
  TeammateCard,
  WelcomeBlock,
} from "../../components";
import { fetchProducts } from "../../redux/slice/products";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import ProductCart from "../../components/productCard";
import PriceBlockContainer from "../../components/priceBlockContainer";
import { ModePriceBlock } from "../../components/priceBlock";
import TeamsContainer from "../../components/teamsContainer";
import { ModeTeamContainer } from "../../common/@types/teammate";
import { selectFilters, setFilters } from "../../redux/slice/filters";

const Home = () => {
  const dispatch = useAppDispatch();
  const { price } = useAppSelector((state) => state.priceSlice);
  const { selectedCategory, searchValue } =
    useAppSelector(selectFilters);

  const params = {
    selectedCategory: {
      name: "Всі",
      categoryProperty: "",
    },
    searchValue: "",
  };
  React.useEffect(() => {
    dispatch(
      setFilters({
        ...params,
      })
    );
  }, []);
  React.useEffect(() => {
    dispatch(
      fetchProducts({
        selectedCategory,
        searchValue,
      })
    );
  }, [params]);

  return (
    <div className={`${style.root ? style.root : ""} container`}>
      <WelcomeBlock />
      <div className={style.price}>
        <PriceBlockContainer
          price={price}
          mode={ModePriceBlock.SHOW}
        />
      </div>
      <TeamsContainer mode={ModeTeamContainer.SHOW} />
      <BigImgsBlock />
      <Map />
      <div className={style.price}></div>
      <div className={style.swiper}></div>
      <div className={style.swiper}></div>
      <div className={style.map}></div>
    </div>
  );
};

export default Home;
