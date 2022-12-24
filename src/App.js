import logo from "./logo.svg";
import "./App.css";
import LogPage from "./componentes/home/logPage";
import NavPage from "./componentes/home/navPage";
import CatPage from "./componentes/home/catPage";
import VidPage from "./componentes/home/vidPage";
import HomePage from "./componentes/home/homePage";
import ListComentario from "./componentes/comentario/listComentario";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<ListComentario />} />
      <Route path="/comentario/:id" element={<ListComentario />} />

    </Routes>
  );
}

export default App;
