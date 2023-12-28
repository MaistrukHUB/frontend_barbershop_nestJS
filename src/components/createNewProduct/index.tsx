import React, { useState } from "react";
import style from "./CreateNewProduct.module.scss";
import Modal from "react-modal";
import axios from "axios";
import * as yup from "yup";
import qs from "qs";

import AddExtent from "../addExtent";
import {
  useAppDispatch,
  useAppSelector,
  useAxiosConfig,
} from "../../utils/hook";
import { fetchProducts } from "../../redux/slice/products";
import WarningModal from "../warningModal";
import {
  Theme,
  toast,
  ToastContainer,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configToast } from "../../utils/configuration";
import { selectFilters, setFilters } from "../../redux/slice/filters";
import { useNavigate } from "react-router-dom";
import { categoriesProduct } from "../../common/consts/categories";

interface CardProps {
  // Інші властивості картки можна додати тут
}

enum ProductType {
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

const CreateNewProduct: React.FC<CardProps> = () => {
  const axiosConfig = useAxiosConfig();

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

  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string[] | null>(
    null
  );

  const [validationErrors, setValidationErrors] =
    useState<FormErrors>({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    type: "",
    about: "",
    cost: [],
    extent: [],
    img: "",
  });

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
    setErrors({});
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
      const productSchema = yup.object().shape({
        name: yup.string().required("Поле Ім'я є обов'язковим"),
        rating: yup
          .number()
          .required("Поле Рейтинг є обов'язковим")
          .min(1, "Рейтинг повинен бути більше 0"),
        type: yup
          .string()
          .oneOf(
            Object.values(ProductType),
            "Оберіть дійсний тип продукту"
          )
          .required("Поле Тип є обов'язковим"),
        about: yup
          .string()
          .required("Поле (про продукт) є обов'язковим"),
        cost: yup
          .array()
          .of(yup.number())
          .required("Поле ціна є обов'язковим")
          .min(1, "Масив ціна повинен містити хоча б один елемент")
          .test(
            "nonZero",
            "Елементи масиву ціна не повинні дорівнювати 0",
            (value) => value.every((element) => element !== 0)
          ),
        img: yup.string().required("Поле Img є обов'язковим"),
      });

      await productSchema.validate(formData, { abortEarly: false });
      if (formData.cost.length !== formData.extent.length) {
        throw new Error(
          "Довжини полів cost та extent не співпадають"
        );
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: FormErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setValidationErrors(validationErrors);
      } else {
        console.error("Помилка при відправці запиту:", error);
        setServerError(["Сталася невідома помилка"]);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await handleValidation();

      const response = await axios.post(
        "http://localhost:6969/products/create",
        formData,
        axiosConfig
      );
      toast.success("Продукт додано!", { ...configToast });
      const resetFormData = {
        name: "",
        rating: 0,
        type: "",
        about: "",
        cost: [],
        extent: [],
        img: "",
      };

      setFormData({ ...resetFormData });
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
        toast.info(`${error.response.data.message}`, {
          ...configToast,
          autoClose: 3000,
        });
        console.log(error.response.data.message);
        setServerError([error.response.data.message]);
      } else {
        toast.info(`Сталася невідома помилка.`, {
          ...configToast,
          autoClose: 3000,
        });

        setServerError(["Сталася невідома помилка."]);
      }
    }
  };

  return (
    <div className={style.card}>
      <div className={style.circle} onClick={openModal}>
        <div className={style.plus}>+</div>
      </div>
      <div className={style.circleText}>Додати новий продукт</div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Додати новий продукт'
        className={style.modal}
        overlayClassName={style.overlay}
      >
        <form>
          <label>
            Ім'я:
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            {validationErrors.name && (
              <div className={style.warningText}>
                {validationErrors.name}
              </div>
            )}
          </label>
          <label>
            Рейтинг:
            <input
              type='number'
              name='rating'
              value={formData.rating}
              onChange={handleChange}
            />
            {validationErrors.rating && (
              <div className={style.warningText}>
                {validationErrors.rating}
              </div>
            )}
          </label>
          <label>
            Тип:
            <select
              name='type'
              value={formData.type || "Обери"}
              onChange={handleChange}
            >
              <option disabled value='Обери' key='Обери'>
                Обери
              </option>
              {Object.values(ProductType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {validationErrors.type && (
              <div className={style.warningText}>
                {validationErrors.type}
              </div>
            )}
          </label>
          <label>
            Зображення (Img):
            <input
              type='text'
              name='img'
              value={formData.img}
              onChange={handleChange}
            />
            {validationErrors.img && (
              <div className={style.warningText}>
                {validationErrors.img}
              </div>
            )}
          </label>
          <label>
            Про продукт:
            <textarea
              name='about'
              value={formData.about}
              onChange={handleChange}
            />
            {validationErrors.about && (
              <div className={style.warningText}>
                {validationErrors.about}
              </div>
            )}
          </label>
          <div className={style.extentBlock}>
            <AddExtent
              setFormData={setFormData}
              formData={formData}
            />
          </div>
          <WarningModal serverError={serverError} />

          <div className={style.buttons}>
            <button
              className={style.itemBg}
              type='button'
              onClick={handleSubmit}
            >
              Додати
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
    </div>
  );
};

export default CreateNewProduct;
