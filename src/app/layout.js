import "./styles/global.css";
import Header from "./layout/header";
import Footer from "./layout/footer";

export const metadata = {
  title: "LoL 밴픽",
  description:
    "롤 밴픽 은 리그 오브 레전드(LoL) 게임에서 밴픽 전략을 최적화하기 위해 개발된 도구입니다. 이 시뮬레이터는 상대팀보다 유리한 밴픽 전략을 세우는 데 도움을 주며, 인게임 내 밴픽 과정에서의 불편함을 해소합니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div id="ban-pick">
          <Header></Header>
          {children}
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
