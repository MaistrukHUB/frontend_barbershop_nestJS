import React, { useState, useEffect } from "react";
import style from "./ModalUpdateProduct.module.scss";
import Modal from "react-modal";
import axios, { AxiosError } from "axios";
import * as Yup from "yup";
import AddExtent from "../addExtent";
import {
  useAppDispatch,
  useAppSelector,
  useAxiosConfig,
} from "../../utils/hook";
import { fetchProducts } from "../../redux/slice/products";
import { ProductItem } from "../../common/@types/product";
import WarningModal from "../warningModal";
import {
  Theme,
  toast,
  ToastContainer,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configToast } from "../../utils/configuration";
import qs from 'qs'
import { useNavigate } from "react-router-dom";
import { selectFilters, setFilters } from "../../redux/slice/filters";
import { categoriesProduct } from "../../common/consts/categories";


interface CardProps {
  isModalOpen: boolean;
  setIsModalOpen: any;
  product: ProductItem;
}

enum EnumProductType {
  hair = "hair",
  beard = "beard",
  shave = "shave",
  certificate = "certificate",
  toothpaste = "toothpaste",
}

interface FormErrors {
  name?: string;
  rating?: string;
  type?: string;
  about?: string;
  cost?: string;
  extent?: string;
  img?: string;
  [key: string]: string | undefined;
}

const ModalUpdateProduct: React.FC<CardProps> = ({
  isModalOpen,
  setIsModalOpen,
  product,
}) => {
  const dispatch = useAppDispatch();
  const axiosConfig = useAxiosConfig();

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


  const [validationErrors, setValidationErrors] =
    useState<FormErrors>({});
  const [serverError, setServerError] = useState<string[] | null>(
    null
  );

  const [formData, setFormData] = useState({
    ...product,
  });

  useEffect(() => {
    setFormData({ ...product });
    setValidationErrors({});
    setServerError(null);
  }, [isModalOpen, product]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      rating: 0,
      type: "",
      about: "",
      cost: [],
      extent: [],
      img: "",
    });
    setValidationErrors({});
    setServerError(null);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "rating" ? parseFloat(value) : value,
    }));
  };

  const handleValidation = async () => {
    try {
      const productSchema = Yup.object().shape({
        name: Yup.string().required("Поле Ім'я є обов'язковим"),
        rating: Yup.number()
          .required("Поле Рейтинг є обов'язковим")
          .min(1, "Рейтинг повинен бути більше 0"),
        type: Yup.string()
          .oneOf(
            Object.values(EnumProductType),
            "Оберіть дійсний тип продукту"
          )
          .required("Поле Тип є обов'язковим"),
        about: Yup.string().required(
          "Поле Про продукт є обов'язковим"
        ),
        cost: Yup.array()
          .of(Yup.number())
          .required("Поле ціна є обов'язковим")
          .min(1, "Масив ціна повинен містити хоча б один елемент")
          .test(
            "nonZero",
            "Елементи масиву Cost не повинні дорівнювати 0",
            (value) => value.every((element) => element !== 0)
          ),
        img: Yup.string().required("Поле Img є обов'язковим"),
      });

      await productSchema.validate(formData, { abortEarly: false });
      setValidationErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: FormErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setValidationErrors(validationErrors);
      } else {
        console.error("Помилка при валідації:", error);
        setServerError(["Сталася невідома помилка"]);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await handleValidation();

      if (formData.cost.length !== formData.extent.length) {
        throw new Error(
          "Довжини полів cost та extent не співпадають"
        );
      }
      const response = await axios.patch(
        `http://localhost:6969/products/${product.id}`,
        formData,
        axiosConfig
      );
      toast.success("Виконано!", { ...configToast });
      dispatch(
        fetchProducts({
          selectedCategory,
          searchValue,
        })
      );
      closeModal();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
        setServerError([error.response.data.message]);
      toast.info(`${error.response.data.message}`, { ...configToast });
      } else {
      toast.info(`Сталася невідома помилка.`, { ...configToast });

        setServerError(["Сталася невідома помилка."]);
      }
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel='Оновити продукт'
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <form>
        <label>
          Ім'я:
          <input
            readOnly={!isModalOpen}
            placeholder={product.name}
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
          {validationErrors.name && (
            <p className={style.warningText}>
              {validationErrors.name}
            </p>
          )}
        </label>
        <label>
          Рейтинг:
          <input
            readOnly={!isModalOpen}
            placeholder={`${product.rating}`}
            type='number'
            name='rating'
            value={`${formData.rating}`}
            onChange={handleChange}
          />
          {validationErrors.rating && (
            <p className={style.warningText}>
              {validationErrors.rating}
            </p>
          )}
        </label>
        <label>
          Тип:
          <select
            name='type'
            value={formData.type || `${product.type}`}
            onChange={handleChange}
            disabled={!isModalOpen}
          >
            <option disabled value='Обери' key='Обери'>
              Обери
            </option>
            {Object.values(EnumProductType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {validationErrors.type && (
            <p className={style.warningText}>
              {validationErrors.type}
            </p>
          )}
        </label>
        <label>
          Зображення (Img):
          <input
            readOnly={!isModalOpen}
            placeholder={product.img}
            type='text'
            name='img'
            value={formData.img}
            onChange={handleChange}
          />
          {validationErrors.img && (
            <p className={style.warningText}>
              {validationErrors.img}
            </p>
          )}
        </label>
        <label>
          Про продукт:
          <textarea
            readOnly={!isModalOpen}
            placeholder={product.about}
            name='about'
            value={formData.about}
            onChange={handleChange}
          />
          {validationErrors.about && (
            <p className={style.warningText}>
              {validationErrors.about}
            </p>
          )}
        </label>
        <div className={style.extentBlock}>
          <div className={style.extentBlock}>
            <AddExtent
              setFormData={setFormData}
              formData={formData}
            />
          </div>
        </div>
        <WarningModal serverError={serverError} />
        <div className={style.buttons}>
          <button
            className={style.itemBg}
            type='button'
            onClick={handleSubmit}
          >
            Оновити
          </button>
          <button
            className={style.itemBor}
            type='button'
            onClick={closeModal}
          >
            Закрити
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
