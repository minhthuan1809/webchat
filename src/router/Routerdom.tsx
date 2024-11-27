import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../page/Login";
import Chat from "../page/Chat";

export default function Routerdom() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
