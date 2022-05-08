import "./App.css";
import Header from "./components/Header";
import { Route } from "wouter";
import nuevoEvento from "./components/NuevoEvento";
import ListaEventos from "./components/ListaEventos";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Route component={ListaEventos} path="/"/>
      <Route component={nuevoEvento} path="/nuevoEvento" />
    </div>
  );
}

export default App;
