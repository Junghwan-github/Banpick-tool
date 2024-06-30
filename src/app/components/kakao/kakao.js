"use client";
import { useEffect } from "react";

const KakaoAdfit = ({ unit, width, height, className, insId }) => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.kakao && window.kakao.adfit) {
      window.kakao.adfit.load();
    }
  }, []);

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
