import React, { useState } from "react";
import {
  Categories,
  UpDataPrice,
  UpDataProduct,
  UpDataTeams,
} from "../../components"; // Припустимо, що це правильний шлях до вашого компоненту Categories
import { categoriesPropertyByUpdate } from "../../common/consts/categories";

import style from "./UpdateDatabase.module.scss";
import { EnumCategory } from "../../components/categories";

const UpdateDatabase: React.FC = () => {
  const [selectCategoryProperty, setSelectCategoryProperty] =
    useState<string>("price");

  return (
    <div className={`${style.root} content`}>
      <div className={style.priceCategories}>
        <Categories
          mode={EnumCategory.anyCategory}
          categories={categoriesPropertyByUpdate}
        />
      </div>
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
