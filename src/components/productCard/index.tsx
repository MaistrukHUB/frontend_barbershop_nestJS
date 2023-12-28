import { Link, useNavigate } from "react-router-dom";
import style from "./ProductCard.module.scss";
import React, { useState } from "react";
import { ProductItem } from "../../common/@types/product";
import ConfirmModal from "../confirmModal";
import axios from "axios";
import {
  useAppDispatch,
  useAppSelector,
  useAxiosConfig,
} from "../../utils/hook";
import Modal from "react-modal";
import { fetchProducts } from "../../redux/slice/products";
import ModalUpdateProduct from "../modalUpdateProduct";
import { addProduct } from "../../redux/slice/cart";
import { CartItemType } from "../../common/@types/cart";
import {
  Theme,
  toast,
  ToastContainer,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configToast } from "../../utils/configuration";
import { selectFilters, setFilters } from "../../redux/slice/filters";
import { categoriesProduct } from "../../common/consts/categories";
import qs from "qs";

const ProductCard: React.FC<any> = ({ itemObj, admin }) => {
  const [selectedExtent, setSelectedExtent] = useState<number>(0);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const axiosConfig = useAxiosConfig();
  const dispatch = useAppDispatch();

  const handleExtent = (index: number) => {
    setSelectedExtent(index);
  };

  const handelDeleteProduct = () => {
    setShowConfirm(true);
  };

  const handelAddProduct = () => {
    const productByCart: CartItemType = {
      idCartProduct: Date.now().toString(),
      idProduct: itemObj.id,
      name: itemObj.name,
      img: itemObj.img,
      cost: itemObj.cost[selectedExtent],
      extent: itemObj.extent[selectedExtent],
      type: itemObj.type,
      count: 0,
    };
    toast.success("Продукт додано!", { ...configToast });

    dispatch(addProduct(productByCart));
  };

  const { selectedCategory, searchValue } =
    useAppSelector(selectFilters);

  const navigate = useNavigate();

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

  const onConfirm = async () => {
    try {
      console.log(itemObj);
      await axios.delete(
        `http://localhost:6969/products/${itemObj.id}`,
        axiosConfig
      );
      dispatch(
        fetchProducts({
          selectedCategory,
          searchValue,
        })
      );
      toast.success("Видалено!", { ...configToast });

      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setShowConfirm(false);
    }
  };
  const onDeny = () => {
    setShowConfirm(false);
  };

  const updateProduct = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={style.productBlockWrapper}>
      <div className={style.productBlock}>
        {admin ? (
          <>
            <div onClick={() => handelDeleteProduct()}>
              <svg
                className={style.deleteIcon}
                width='25px'
                height='25px'
                viewBox='0 0 1024 1024'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z' />
              </svg>
            </div>
            <div onClick={() => updateProduct()}>
              <svg
                className={style.settingIcon}
                width='25px'
                height='25px'
                version='1.1'
                id='Capa_1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 482.568 482.568'
              >
                <g>
                  <g>
                    <path
                      d='M116.993,203.218c13.4-1.8,26.8,2.8,36.3,12.3l24,24l22.7-22.6l-32.8-32.7c-5.1-5.1-5.1-13.4,0-18.5s13.4-5.1,18.5,0
			l32.8,32.8l22.7-22.6l-24.1-24.1c-9.5-9.5-14.1-23-12.3-36.3c4-30.4-5.7-62.2-29-85.6c-23.8-23.8-56.4-33.4-87.3-28.8
			c-4.9,0.7-6.9,6.8-3.4,10.3l30.9,30.9c14.7,14.7,14.7,38.5,0,53.1l-19,19c-14.7,14.7-38.5,14.7-53.1,0l-31-30.9
			c-3.5-3.5-9.5-1.5-10.3,3.4c-4.6,30.9,5,63.5,28.8,87.3C54.793,197.518,86.593,207.218,116.993,203.218z'
                    />
                    <path
                      d='M309.193,243.918l-22.7,22.6l134.8,134.8c5.1,5.1,5.1,13.4,0,18.5s-13.4,5.1-18.5,0l-134.8-134.8l-22.7,22.6l138.9,138.9
			c17.6,17.6,46.1,17.5,63.7-0.1s17.6-46.1,0.1-63.7L309.193,243.918z'
                    />
                    <path
                      d='M361.293,153.918h59.9l59.9-119.7l-29.9-29.9l-119.8,59.8v59.9l-162.8,162.3l-29.3-29.2l-118,118
			c-24.6,24.6-24.6,64.4,0,89s64.4,24.6,89,0l118-118l-29.9-29.9L361.293,153.918z'
                    />
                  </g>
                </g>
              </svg>
            </div>
          </>
        ) : (
          ""
        )}
        <ModalUpdateProduct
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          product={itemObj}
        />
        {showConfirm ? (
          <ConfirmModal
            message={`Видалити продукт ${itemObj.name}?`}
            confirmButtonText={"Видалити"}
            denyButtonText={"Відмінити"}
            onConfirm={onConfirm}
            onDeny={onDeny}
            setShowConfirm={setShowConfirm}
          />
        ) : (
          ""
        )}
        {itemObj.extent.length > 0 &&
        itemObj.type !== "certificate" ? (
          ""
        ) : (
          <div className={style.emptyBlock}></div>
        )}
        <Link to={`/`}>
          <img
            className={style.productBlockImage}
            src={itemObj.img}
            alt='product'
          />
        </Link>
        <h4 className={style.productBlockTitle}>{itemObj.name}</h4>
        {itemObj.extent.length > 0 &&
        itemObj.type !== "certificate" ? (
          <div className={style.productBlockSelector}>
            <ul>
              {itemObj.extent.map((item: number, index: number) => (
                <li
                  onClick={() => handleExtent(index)}
                  key={item}
                  className={
                    selectedExtent === index ? style.active : ""
                  }
                >
                  {item}{" "}
                  {itemObj.category === "shave" ? "млг." : "гр."}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={style.emptyBlock}></div>
        )}
        <div className={style.productBlockBottom}>
          <div className={style.productBlockPrice}>
            {itemObj.cost[selectedExtent]} ГРН
          </div>
          <div
            onClick={() => handelAddProduct()}
            className={`${style.button}`}
          >
            <span>+</span>
            <span>Додати</span>
            {/* <span>0</span> */}
            {/* {countItems > 0 ? <i>{countItems} </i> : ""} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
