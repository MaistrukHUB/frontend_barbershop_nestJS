import { useState } from "react";
import {
  CartItemType,
  IFormDataByOrder,
} from "../../common/@types/cart";
import { useAppSelector } from "../hook";
import axios from "axios";
import {
  Theme,
  toast,
  ToastContainer,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configToast } from "../../utils/configuration";

const TOKEN: string =
  "6035490675:AAHiOj1PMoKX3yYW3cuz4Ai0FNP_da5iFbE";
const CHAT_ID: string = "-1001972265061";
const URI_API: string = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

let LIST_BY_MESSAGE: string = "";

export const createListByOrder = (productsCart: CartItemType[]) => {
  const LIST_BY_ORDER: string[] =
    productsCart &&
    productsCart.map((product) => {
      return (LIST_BY_MESSAGE +=
        `<b>Продукт: </b>${product.name}` +
        `<b>  Обєм: </b>${product.extent}` +
        `<b>  Кількість:</b>${product.count} \n`);
    });
  console.log(LIST_BY_ORDER);
  return LIST_BY_ORDER;
};

export const handelSandOrder = (
  formData: IFormDataByOrder,
  totalPrice: number
) => {
  let message: string = `<b>ЗАЯВКА З САЙТУ</b>\n`;
  message += `<b>Замовник: </b>${formData.name} \n`;
  message += `<b>Телефон: </b>${formData.phone} \n`;
  message += `<b>Email: </b>${formData.email} \n`;
  message += `<b>Загальна сума: </b>${totalPrice} грн. \n`;

  axios.post(URI_API, {
    chat_id: CHAT_ID,
    parse_mode: "html",
    text: message + LIST_BY_MESSAGE,
  });
  LIST_BY_MESSAGE = "";
  toast.success("Замовлення створено!", { ...configToast });
};

export const createNewOrder = (
  productsCart: CartItemType[],
  formData: IFormDataByOrder,
  totalPrice: number
) => {
  createListByOrder(productsCart);
  handelSandOrder(formData, totalPrice);
};
