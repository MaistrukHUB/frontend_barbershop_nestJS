import React from "react";
import style from "./UpDataProduct.module.scss";
import { useAppSelector } from "../../../utils/hook";
import ProductItemsContainer from "../../productItemsContainer";
import { ProductMode } from "../../../common/@types/product";

const test = [
  {
    id: "0",
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
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "5",
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

const UpDataProduct = () => {
  const { products, status } = useAppSelector(
    (state) => state.productsSlice
  );
  return (
    <div className={style.root}>
      <ProductItemsContainer
        products={products}
        status={status}
        mode={ProductMode.Edit}
        // mode={ProductMode.OnlyShow}
      />
    </div>
  );
};

export default UpDataProduct;
