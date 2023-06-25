import { useEffect, useState } from "react";

export const UseResponsivePage = () => {
  const [toggolepage, setToggelPage] = useState({
    sideBar: true,
    chet: true,
  });

  useEffect(() => {
    const mediaQueryMin = window.matchMedia("(max-width: 575px)");
    const mediaQueryMax = window.matchMedia("(min-width: 575px)");

    function handleWindowMax(event) {
      if (event.matches) {
        setToggelPage({ sideBar: true, chet: false });
      }
    }
    function handleWindowMin(event) {
      if (event.matches) {
        setToggelPage({ sideBar: true, chet: true });
      }
    }
    mediaQueryMin.addEventListener("change", handleWindowMax);
    mediaQueryMax.addEventListener("change", handleWindowMin);
  });

  return {
    sidbarSize: toggolepage.sideBar,
    chetSize: toggolepage.chet,
    setToggelPage,
  };
};
export default UseResponsivePage;
