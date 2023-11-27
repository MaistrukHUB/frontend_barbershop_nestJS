import React, { useState } from "react";
import {
  Categories,
  UpDataPrice,
  UpDataProduct,
  UpDataTeams,
} from "../../components"; // Припустимо, що це правильний шлях до вашого компоненту Categories
import { categoriesPropertyByUpdate } from "../../common/consts/categories";

import style from "./UpdateDatabase.module.scss";

const UpdateDatabase: React.FC = () => {
  const [selectCategoryProperty, setSelectCategoryProperty] =
    useState<string>("products");

  return (
    <div className={`${style.root} content`}>
      <Categories
        categories={categoriesPropertyByUpdate}
        setSelectCategoryProperty={setSelectCategoryProperty}
      />
      {selectCategoryProperty === "products" ? (
        <UpDataProduct />
      ) : selectCategoryProperty === "price" ? (
        <UpDataPrice />
      ) : (
        <UpDataTeams />
      )}
    </div>
  );
};

export default UpdateDatabase;
