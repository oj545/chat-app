import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import ChetPage from "./components/pages/ChetPage";
import Chet from "./components/elements/Chet";
import { useEffect } from "react";
import { GetCookie } from "./hooksAndFunctions/cookies";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = GetCookie("jwt");
    if (!jwt) {
      navigate("/signUp");
    } else {
      navigate("/chet");
    }
  }, []);

  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="signUp" element={<SignUp />} />
            <Route path="chet" element={<ChetPage />}>
              <Route path=":channel" element={<Chet />} />
            </Route>
          </Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
