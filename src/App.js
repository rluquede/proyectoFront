import "./App.css";
import Header from "./components/Header";
import { Route } from "wouter";
import Home from "./pages/Home";
import EventoForm from "./components/EventoForm";
import EventoVista from "./components/EventoVista";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Route component={Home} path="/"/>
      <Route component={Home} path="/misEntradas"/>
      <Route component={EventoForm} path="/nuevoEvento" />
      <Route component={EventoVista} path="/evento/:id"/>
    </div>
  );
}

export default App;
