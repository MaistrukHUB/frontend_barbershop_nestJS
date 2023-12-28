import React from "react";
import style from "./WarningModal.module.scss";

interface IWarningModalProps {
  serverError: string[] | null;
}

const WarningModal: React.FC<IWarningModalProps> = ({
  serverError,
}) => {
  return (
    <>
      {serverError && (
        <div className={style.root}>
          <p className={style.warningMessage}>
            {serverError.map((item: string, index: number) => (
              <div className={style.warningMessageItem}>
                {index + 1}.Помилка: {item}
              </div>
            ))}
          </p>
        </div>
      )}
    </>
  );
};

export default WarningModal;
