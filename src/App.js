import "./App.css";
import Header from "./components/Header";
import { Route } from "wouter";
import Home from "./pages/Home";
import EventoForm from "./components/EventoForm";
import EventoVista from "./components/EventoVista";
import Entradas from "./pages/Entradas";
import EntradaVista from "./components/EntradaVista";
import Terminos from "./pages/Terminos";
import Contacto from "./pages/Contacto";
import Footer from "./components/Footer";
import ErrorUnauthorized from "./pages/ErrorUnauthorized";
import ErrorNotFound from "./pages/ErrorNotFound";
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Route component={Home} path="/"/>
      <Route component={Entradas} path="/misEntradas"/>
      <Route component={EventoForm} path="/nuevoEvento" />
      <Route component={EventoVista} path="/evento/:id"/>
      <Route component={EntradaVista} path="/entrada/:id"/>
      <Route component={EventoForm} path="/actualizarEvento/:id"/>
      <Route component={Terminos} path="/terminos"/>
      <Route component={Contacto} path="/contacto"/>
      <Route component={ErrorNotFound} path="/errorNotFound"/>
      <Route component={ErrorUnauthorized} path="/errorUnauthorized"/>
      <Footer></Footer>
    </div>
  );
}

export default App;
