import React, { useState } from "react";
import style from "./Categories.module.scss";
import { Category } from "../../common/@types/categories";

interface ICategoryProperty {
  categories: Category[];
  setSelectCategoryProperty: (property: string) => void;
}

const Categories: React.FC<ICategoryProperty> = ({
  categories,
  setSelectCategoryProperty,
}) => {
  const [category, setCategory] = useState<Category>(categories[0]);

  const onClickCategory = (item: Category) => {
    setCategory(item);
    setSelectCategoryProperty(item.categoryProperty);
  };

  return (
    <div className={style.root}>
      <ul>
        {categories.length > 0 &&
          categories.map((item) => (
            <li
              onClick={() => onClickCategory(item)}
              key={item.categoryProperty}
              className={
                category?.name === item.name ? style.active : ""
              }
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
