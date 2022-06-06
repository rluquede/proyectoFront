import { Route } from "wouter";
import CarouselInicio from "../../components/CarouselInicio";
import ListaEntradas from "../../components/MisEntradas";
export default function Entradas() {
  return (
    <>
      <CarouselInicio></CarouselInicio>
      <Route component={ListaEntradas} path="/misEntradas"/>

    </>
  );
}
