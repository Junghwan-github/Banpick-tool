/* eslint-disable @next/next/no-img-element */
"use client";
import style from "./footer.module.css";
import Modal from "../components/modal/modal";
import Image from "next/image";
import { useState } from "react";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClickShowModal = () => {
    setShowModal(true);
  };

  const handleClickCloseModal = () => {
    setShowModal(false);
  };

  return (
    <footer className={style.footer}>
      <div className={style.dev}>
        <p className={style.contact}>
          Developer <span onClick={handleClickShowModal}>Contact</span>
        </p>
        <p className={style.copyright}>
          Copyright 2024. <span>PARK JUNGHWAN.</span>
        </p>
      </div>
      <Modal show={showModal}>
        <div className={style.contact_modal}>
          <button type="button" onClick={handleClickCloseModal}>
            <span></span>
            <span></span>
          </button>
          <div>
            <h2>Developer Contact</h2>
            <ul>
              <li>
                <p>Name : PARK JUNG HWAN</p>
              </li>
              <li>
                <p>
                  KAKAO Open Chat :
                  <a href="https://open.kakao.com/o/snC6l0zg" target="_blank">
                    https://open.kakao.com/o/snC6l0zg
                  </a>
                </p>
              </li>
              <li className={style.li_img}>
                <p>KAKAO Open Chat QR code</p>
                <img src="/images/qr/chat-qr.png" alt="chatQR" />
              </li>
              <li>
                <p>Email : jungie2@naver.com</p>
              </li>
              <li>
                <p>
                  GitHub :
                  <a href="https://github.com/Junghwan-github/" target="_blank">
                    https://github.com/Junghwan-github/
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;
