import "./styles/global.css";
import Header from "./layout/header";
import Footer from "./layout/footer";
import Script from "next/script";
import KakaoAdfit from "./components/kakao/kakao";

export const metadata = {
  generator: "Next.js",
  authors: [
    { name: "PARK JUNG HWAN" },
    { name: "PARK JUNG HWAN", url: "https://github.com/Junghwan-github/" },
  ],
  title: "밴픽 툴 - 리그오브레전드",
  description:
    "롤 밴픽 은 리그 오브 레전드(LoL) 게임에서 밴픽 전략을 최적화하기 위해 개발된 도구입니다. 이 시뮬레이터는 상대팀보다 유리한 밴픽 전략을 세우는 데 도움을 주며, 인게임 내 밴픽 과정에서의 불편함을 해소합니다.",
  keywords: [
    "롤",
    "리그오브레전드",
    "밴픽",
    "lol",
    "banpick",
    "밴픽 툴",
    "밴픽 시뮬레이터",
    "밴픽 연습",
  ],
  robots: "index, follow",
  openGraph: {
    title: "밴픽 툴 - 리그오브레전드",
    description:
      "롤 밴픽 은 리그 오브 레전드(LoL) 게임에서 밴픽 전략을 최적화하기 위해 개발된 도구입니다. 이 시뮬레이터는 상대팀보다 유리한 밴픽 전략을 세우는 데 도움을 주며, 인게임 내 밴픽 과정에서의 불편함을 해소합니다.",
    url: "https://banpick.vercel.app",
    images: [
      {
        url: "https://banpick.vercel.app/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://banpick.vercel.app/og-alt.png",
        width: 1800,
        height: 1600,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  verification: {
    google: "W6IEH3V3YUxR7LOSRk6AkvamhPPViElobta_aRKMgh4",
    other: {
      "naver-site-verification": "27d7050d868ef37a5af94a294cb84217fc22ae9f",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <Script
          id="kakao-adfit-sdk"
          src="//t1.daumcdn.net/kas/static/ba.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <div id="ban-pick">
          <Header />
          <div className="content_container">
            <KakaoAdfit
              unit="DAN-h7wzt6M5jS4R4Czh"
              width="160"
              height="600"
              className="kakao_adfit"
              insId="root_left"
            />
            {children}
            <KakaoAdfit
              unit="DAN-N6U0D1k68MQihPyj"
              width="160"
              height="600"
              className="kakao_adfit"
              insId="root_right"
            />
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
