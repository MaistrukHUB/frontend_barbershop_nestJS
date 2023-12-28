import React, { useState } from "react";
import style from "./Categories.module.scss";
import { Category } from "../../common/@types/categories";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import {
  selectFiltersCategory,
  setCategory,
} from "../../redux/slice/filters";

export enum EnumCategory {
  categoryProduct = "categoryProduct",
  anyCategory = "anyCategory",
}

interface ICategoryProperty {
  categories: Category[];
  mode: EnumCategory;
}

const Categories: React.FC<ICategoryProperty> = ({
  categories,
  mode,
}) => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectFiltersCategory);

  const onClickCategory = (item: Category) => {
    if (mode === EnumCategory.categoryProduct) {
      dispatch(setCategory(item));
    }
    if (mode === EnumCategory.anyCategory) {
      setAnyCategory(item);
    }
  };
  const [anyCategory, setAnyCategory] = useState(categories[0]);
  return (
    <div className={style.root}>
      <ul>
        {categories.length > 0 &&
          categories.map((item) => (
            <li
              onClick={() => onClickCategory(item)}
              key={item.categoryProperty}
              className={`
                ${category?.name === item.name ? style.active : ""}
                ${
                  mode === EnumCategory.anyCategory && anyCategory?.name === item.name ? style.active : ""
                }`}
            >
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;

// import React, { useEffect, useState } from "react";
// import style from "./Categories.module.scss";
// import { useSelector, useDispatch } from "react-redux";
// import { Category } from "../../common/@types/categories";

// interface ICategoryProperty {
//   categories: Category[];
// }

// const Categories: React.FC<ICategoryProperty> = ({
//   categories,
//   setSelectCategoryProperty,
// }) => {
//   // const category = useSelector(selectFiltersCategory)
//   // const dispatch = useDispatch()

//   const [category, setCategory] = useState(categories[0]);

//   // const onClickCategory = (item: Category) => {
//   // dispatch(setCategory(item))
//   // }
//   const onClickCategory = (item: Category) => {
//     setCategory(item);
//     setSelectCategoryProperty(item.categoryProperty);
//   };
//   return (
//     <div className={style.root}>
//       <ul>
//         {categories &&
//           categories.map((item, index) => (
//             <li
//               onClick={() => onClickCategory(item)}
//               key={`${item}+${index}`}
//               className={
//                 category?.name === item.name ? style.active : ""
//               }
//             >
//               {item.name}
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// };

// export default Categories;
