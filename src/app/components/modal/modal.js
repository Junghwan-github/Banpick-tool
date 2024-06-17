import style from "./modal.module.css";

const Modal = ({ show, onClose, children }) => {


  if (!show) {
    return null;
  }

  return (
    <div className={style.overlay}>
       
      <div className={style.content}>
        <div className={style.google_ad}>
        </div>
        <button className={style.close} onClick={onClose}>
          시작하기
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
