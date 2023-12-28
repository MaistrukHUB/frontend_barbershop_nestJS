import React, { useState } from "react";
import style from "./PriceBlock.module.scss";
import {
  useAdmin,
  useAppDispatch,
  useAxiosConfig,
} from "../../utils/hook";
import { PriceItem } from "../../common/@types/price";
import axios from "axios";
import { fetchPrice } from "../../redux/slice/price";
import ModalUpdatePrice from "../modalUpdatePrice";
import ConfirmModal from "../confirmModal";
import {
  Theme,
  toast,
  ToastContainer,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configToast } from "../../utils/configuration";

export enum ModePriceBlock {
  SHOW = "show",
  UPDATE = "update",
}
interface IPriceBlockProps {
  item: PriceItem;

  mode: ModePriceBlock;
}
const PriceBlock: React.FC<IPriceBlockProps> = ({ item, mode }) => {
  const axiosConfig = useAxiosConfig();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const handelDeleteButton = async () => {
    setShowConfirm(true);
  };
  
  const onConfirm = async () => {
    try {
      await axios.delete(
        `http://localhost:6969/price/${item.id}`,
        axiosConfig
      );
      toast.info("Видалено!", { ...configToast });

      dispatch(fetchPrice());
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const onDeny = () => {
    setShowConfirm(false);
  };

  const handelSettingButton = () => {
    setIsModalOpen(true);
  };
  return (
    <div className={style.price}>
      <p className={style.priceText}>{item.name}</p>
      <div className={style.priceBlockCost}>
        {item.isRange ? (
          <span className={style.priceIsRange}>від</span>
        ) : (
          ""
        )}
        <span className={style.priceCost}>{item.cost}</span>
        {mode === "update" ? (
          <>
            <div onClick={() => handelDeleteButton()}>
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
            <div onClick={handelSettingButton}>
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
      </div>
      <ModalUpdatePrice
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        priceItem={item}
      />
      {showConfirm ? (
        <ConfirmModal
          message={`Видалити послугу ${item.name}?`}
          confirmButtonText={"Видалити"}
          denyButtonText={"Відмінити"}
          onConfirm={onConfirm}
          onDeny={onDeny}
          setShowConfirm={setShowConfirm}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PriceBlock;
