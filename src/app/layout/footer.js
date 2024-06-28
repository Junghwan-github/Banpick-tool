import style from "./footer.module.css";
const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.dev}>
        <p className={style.copyright}>Copyright 2024. <span>PARK JUNGHWAN.</span></p>
        <p className={style.contact}>
          개발문의 Email jungie2@naver.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
