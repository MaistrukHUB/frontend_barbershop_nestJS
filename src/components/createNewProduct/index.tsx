import React, { useState } from "react";
import style from "./CreateNewProduct.module.scss";
import Modal from "react-modal";
import axios from "axios";
import * as Yup from "yup";
import AddExtent from "../addExtent";
import {
  useAppDispatch,
  useAppSelector,
  useAxiosConfig,
} from "../../utils/hook";
import { fetchProducts } from "../../redux/slice/products";

interface CardProps {
  // Інші властивості картки можна додати тут
}

enum ProductType {
  hair = "hair",
  beard = "beard",
  shave = "shave",
  certificate = "certificate",
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
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.authSlice);
  const axiosConfig = useAxiosConfig();

  const [errors, setErrors] = useState<FormErrors>({});

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

  const productSchema = Yup.object().shape({
    name: Yup.string().required("Поле Ім'я є обов'язковим"),
    rating: Yup.number()
      .required("Поле Рейтинг є обов'язковим")
      .min(1, "Рейтинг повинен бути більше 0"),
    type: Yup.string()
      .oneOf(
        Object.values(ProductType),
        "Оберіть дійсний тип продукту"
      )
      .required("Поле Тип є обов'язковим"),
    about: Yup.string().required("Поле Про продукт є обов'язковим"),
    cost: Yup.array()
      .of(Yup.number())
      .required("Поле Cost є обов'язковим")
      .min(1, "Масив Cost повинен містити хоча б один елемент")
      .test(
        "nonZero",
        "Елементи масиву Cost не повинні дорівнювати 0",
        (value) => value.every((element) => element !== 0)
      ),
    img: Yup.string().required("Поле Img є обов'язковим"),
  });

  const handleSubmit = async () => {
    try {
      await productSchema.validate(formData, { abortEarly: false });
      // Валідація довжини полів cost та extent
      if (formData.cost.length !== formData.extent.length) {
        throw new Error(
          "Довжини полів cost та extent не співпадають"
        );
      }
      console.log(formData);
      const response = await axios.post(
        "http://localhost:6969/products/create",
        formData,
        axiosConfig
      );
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
      dispatch(fetchProducts());
      closeModal();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: FormErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      } else {
        console.error("Помилка при відправці запиту:");
      }
    }
  };

  return (
    <div className={style.card}>
      {/* Інші елементи картки */}
      <div className={style.circle} onClick={openModal}>
        <div className={style.plus}>+</div>
      </div>
      <div className={style.circleText}>Додати новий продукт</div>
      {/* Модальне вікно */}
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
            {errors.name && <p className={style.worningText}>{errors.name}</p>}
          </label>

          <label>
            Рейтинг:
            <input
              type='number'
              name='rating'
              value={formData.rating}
              onChange={handleChange}
            />
            {errors.rating && <p className={style.worningText}>{errors.rating}</p>}
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
            {errors.type && <p className={style.worningText}>{errors.type}</p>}
          </label>
          <label>
            Зображення (Img):
            <input
              type='text'
              name='img'
              value={formData.img}
              onChange={handleChange}
            />
            {errors.img && <p className={style.worningText}>{errors.img}</p>}
          </label>
          <label>
            Про продукт:
            <textarea
              name='about'
              value={formData.about}
              onChange={handleChange}
            />
            {errors.about && <p className={style.worningText}>{errors.about}</p>}
          </label>
          <div className={style.extentBlock}>
            <AddExtent
              setFormData={setFormData}
              formData={formData}
            />
          </div>
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
