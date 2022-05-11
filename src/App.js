import "./App.css";
import Header from "./components/Header";
import { Route } from "wouter";
import Home from "./pages/Home";
import EventoForm from "./components/EventoForm";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Route component={Home} path="/"/>
      <Route component={Home} path="/misEntradas"/>
      <Route component={EventoForm} path="/nuevoEvento" />
    </div>
  );
}

export default App;
