import style from "./modal.module.css";

const Modal = ({ show, children }) => {

  if (!show) {
    return null;
  }

  return (
    <div className={style.overlay}>
      <div className={style.content}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
