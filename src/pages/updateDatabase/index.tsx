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
    useState<string>("price");

  return (
    <div className={`${style.root} content`}>
      <Categories
        categories={categoriesPropertyByUpdate}
        setSelectCategoryProperty={setSelectCategoryProperty}
      />
      {selectCategoryProperty === "price" ? (
        <UpDataPrice />
      ) : selectCategoryProperty === "products" ? (
        <UpDataProduct />
      ) : (
        <UpDataTeams />
      )}
    </div>
  );
};

export default UpdateDatabase;
