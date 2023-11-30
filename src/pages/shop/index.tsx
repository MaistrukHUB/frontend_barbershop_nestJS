import React, { useState } from "react";
import style from "./Shop.module.scss";
import {
  Categories,
  ProductItemsContainer,
  Search,
} from "../../components";
import { useAppSelector } from "../../utils/hook";
import { categoriesProduct } from "../../common/consts/categories";
import { ProductMode } from "../../common/@types/product";

const test = [
  {
    name: "Uppercut Deluxe Matt Pomade",
    rating: null,
    cost: [350, 650, 1600],
    type: "UppercutMattPomade",
    extent: [30, 100, 300],
    about:
      "Любите невимушені та природні укладки? Тоді вам підійде Uppercut Deluxe Easy Hold. Легкий крем підкреслює текстуру волосся, підтримує об’єм та довершує зачіску натуральним матовим фінішем. Він підходить для всіх типів волосся, але найкраще виглядає на тонкому й кучерявому. Завдяки формулі на водній основі засіб непомітний на волоссі та легко змивається водою.",
    category: "hair",
    img: [
      "https://images.squarespace-cdn.com/content/v1/5d54d94fb05f400001454be1/1589246378906-QVP2B3WGXNNTZW60H63D/CB_Products_Uppercut_Matte_Pomade.png?format=1500w",
    ],
  },
  {
    name: "Uppercut Deluxe ",
    rating: null,
    cost: [350, 650, 1600],
    type: "UppercutMattPomade",
    extent: [30, 100, 300],
    about:
      "Любите невимушені та природні укладки? Тоді вам підійде Uppercut Deluxe Easy Hold. Легкий крем підкреслює текстуру волосся, підтримує об’єм та довершує зачіску натуральним матовим фінішем. Він підходить для всіх типів волосся, але найкраще виглядає на тонкому й кучерявому. Завдяки формулі на водній основі засіб непомітний на волоссі та легко змивається водою.",
    category: "hair",
    img: [
      "https://images.squarespace-cdn.com/content/v1/5d54d94fb05f400001454be1/1589246378906-QVP2B3WGXNNTZW60H63D/CB_Products_Uppercut_Matte_Pomade.png?format=1500w",
    ],
  },
  {
    name: "Uppercut Deluxe ",
    rating: null,
    cost: [350, 650, 1600],
    type: "UppercutMattPomade",
    extent: [30, 100, 300],
    about:
      "Любите невимушені та природні укладки? Тоді вам підійде Uppercut Deluxe Easy Hold. Легкий крем підкреслює текстуру волосся, підтримує об’єм та довершує зачіску натуральним матовим фінішем. Він підходить для всіх типів волосся, але найкраще виглядає на тонкому й кучерявому. Завдяки формулі на водній основі засіб непомітний на волоссі та легко змивається водою.",
    category: "hair",
    img: [
      "https://images.squarespace-cdn.com/content/v1/5d54d94fb05f400001454be1/1589246378906-QVP2B3WGXNNTZW60H63D/CB_Products_Uppercut_Matte_Pomade.png?format=1500w",
    ],
  },
  {
    name: "Uppercut Deluxe ",
    rating: null,
    cost: [350, 650, 1600],
    type: "UppercutMattPomade",
    extent: [30, 100, 300],
    about:
      "Любите невимушені та природні укладки? Тоді вам підійде Uppercut Deluxe Easy Hold. Легкий крем підкреслює текстуру волосся, підтримує об’єм та довершує зачіску натуральним матовим фінішем. Він підходить для всіх типів волосся, але найкраще виглядає на тонкому й кучерявому. Завдяки формулі на водній основі засіб непомітний на волоссі та легко змивається водою.",
    category: "hair",
    img: [
      "https://images.squarespace-cdn.com/content/v1/5d54d94fb05f400001454be1/1589246378906-QVP2B3WGXNNTZW60H63D/CB_Products_Uppercut_Matte_Pomade.png?format=1500w",
    ],
  },
  {
    name: "Uppercut Deluxe ",
    rating: null,
    cost: [350, 650, 1600],
    type: "UppercutMattPomade",
    extent: [30, 100, 300],
    about:
      "Любите невимушені та природні укладки? Тоді вам підійде Uppercut Deluxe Easy Hold. Легкий крем підкреслює текстуру волосся, підтримує об’єм та довершує зачіску натуральним матовим фінішем. Він підходить для всіх типів волосся, але найкраще виглядає на тонкому й кучерявому. Завдяки формулі на водній основі засіб непомітний на волоссі та легко змивається водою.",
    category: "hair",
    img: [
      "https://images.squarespace-cdn.com/content/v1/5d54d94fb05f400001454be1/1589246378906-QVP2B3WGXNNTZW60H63D/CB_Products_Uppercut_Matte_Pomade.png?format=1500w",
    ],
  },
];
const status = "success";

const Shop = () => {
  const { products, status } = useAppSelector(
    (state) => state.productsSlice
  );

  const [selectCategoryProperty, setSelectCategoryProperty] =
    useState<string>("");
  return (
    <div className={`${style.root} content`}>
      <div className={style.filterBlock}>
        <Categories
          categories={categoriesProduct}
          setSelectCategoryProperty={setSelectCategoryProperty}
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
