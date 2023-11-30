import React from "react";
import style from "./ConfirmModal.module.scss";

interface IConfirmModalProps {
  confirmButtonText: string;
  denyButtonText: string;
  message: string;
  onConfirm: () => void;
  onDeny: () => void;
  setShowConfirm: (showConfirm: boolean) => void;
}

const ConfirmModal: React.FC<IConfirmModalProps> = ({
  confirmButtonText,
  denyButtonText,
  message,
  onConfirm,
  onDeny,
  setShowConfirm,
}) => {
  const handleConfirm = () => {
    setShowConfirm(false);
    onConfirm();
  };

  const handleDeny = () => {
    setShowConfirm(false);
    onDeny();
  };

  return (
    <div
      style={{ zIndex: "10000000000000000" }}
      className={style.confirmModal}
    >
      <img
        className={style.img}
        // src={IconConfirm}
        alt='Icon confirm'
      />
      <div className={style.title}>{message}</div>
      <div className={style.buttons}>
        <button onClick={handleDeny}>{denyButtonText}</button>
        <button onClick={handleConfirm}>{confirmButtonText}</button>
      </div>
    </div>
  );
};

export default ConfirmModal;
