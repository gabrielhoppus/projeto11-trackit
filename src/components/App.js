import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import Today from "./Today";
import Menu from "./Menu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/cadastro" element={<RegisterScreen />} />
        <Route path="/hoje" element={<Menu><Today/></Menu>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
