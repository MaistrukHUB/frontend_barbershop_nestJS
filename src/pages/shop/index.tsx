import React, { useState } from "react";
import style from "./Shop.module.scss";
import {
  Categories,
  ProductItemsContainer,
  Search,
} from "../../components";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { categoriesProduct } from "../../common/consts/categories";
import { ProductMode } from "../../common/@types/product";
import { selectFilters, setFilters } from "../../redux/slice/filters";
import qs from 'qs'
import { fetchProducts } from "../../redux/slice/products";
import { useNavigate } from "react-router-dom";
import { EnumCategory } from "../../components/categories";

const Shop = () => {
  const { products, status } = useAppSelector(
    (state) => state.productsSlice
  );
  const { selectedCategory, searchValue } =
    useAppSelector(selectFilters);

    const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isParams = React.useRef<boolean>(false);
  const isMounted = React.useRef<boolean>(false);

  // якщо був перший ренднр перевіряємо URL-параметри і зберігаємо їх
  React.useEffect(() => {
    if (window.location.search) {
      const parseNavigate = qs.parse(
        window.location.search.substring(1)
      );
      const params = {
        selectedCategory:
        categoriesProduct.find(
            (obj) =>
              obj.categoryProperty === parseNavigate.categoryProperty
          ) || selectedCategory,
        searchValue: parseNavigate.searchValue
          ? parseNavigate.searchValue.toString()
          : "",
      };
      if (
        searchValue !== undefined &&
        selectedCategory !== undefined
      ) {
        dispatch(
          setFilters({
            ...params,
          })
        );
      }
      isParams.current = true;
    }
  }, []);
  //Функція яка робить запит до беку та витягує продукти
  const getProducts = async () => {
    dispatch(
      fetchProducts({
        selectedCategory,
        searchValue,
      })
    );
  };

  // відповідає за те щоб при першому рендері не вшивати в силку парамерти-URL
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryProperty:
          selectedCategory && selectedCategory.categoryProperty
            ? selectedCategory.categoryProperty
            : "",
        searchValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [selectedCategory, searchValue]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isParams.current) {
      getProducts();
    }
    isParams.current = false;
  }, [selectedCategory, searchValue]);
  return (
    <div className={`${style.root} content`}>
      <div className={style.filterBlock}>
        <Categories
          mode={EnumCategory.categoryProduct}
          categories={categoriesProduct}
          // setSelectCategoryProperty={setSelectCategoryProperty}
        />
        <Search />
      </div>
      <ProductItemsContainer
        products={products}
        status={status}
        // mode={ProductMode.Edit}
        mode={ProductMode.OnlyShow}
      />
    </div>
  );
};

export default Shop;
