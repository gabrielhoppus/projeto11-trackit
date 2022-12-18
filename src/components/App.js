import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import Today from "./Today";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/cadastro" element={<RegisterScreen />} />
        <Route path="/hoje" element={<Today />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
