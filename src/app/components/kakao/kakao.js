"use client";
import { useEffect } from "react";
const KakaoAdfit = ({ unit, width, height, className, insId }) => {
  useEffect(() => {
    const loadAdfitScript = () => {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
      script.async = true;
      script.onload = () => {
        if (window.kakao && window.kakao.adfit) {
          window.kakao.adfit.load();
        }
      };
      document.head.appendChild(script);
    };

    if (typeof window !== "undefined" && !window.kakao?.adfit) {
      loadAdfitScript();
    } else if (window.kakao?.adfit) {
      window.kakao.adfit.load();
    }
  }, [unit]);
  return (
    <div className={className}>
      <ins
        id={insId}
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit={unit}
        data-ad-width={width}
        data-ad-height={height}
      ></ins>
      
    </div>
  );
};

export default KakaoAdfit;
