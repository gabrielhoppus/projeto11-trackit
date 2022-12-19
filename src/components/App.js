import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./UserContext";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import Today from "./Today";
import Habits from "./Habits";
import History from "./History";
import Menu from "./Menu";
import { useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const [userImage, setImage] =useState("")

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ token, setToken, userImage, setImage }}>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/cadastro" element={<RegisterScreen />} />
          <Route path="/hoje" element={<><Menu/><Today /></>} />
          <Route path="habitos" element={<><Menu/><Habits /></>} />
          <Route path="historico" element={<><Menu /><History /></>} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
