import React from "react";
import "./index.css";
import { Route } from "wouter";
import ListaEventos from "../../components/ListaEventos";
import CarouselInicio from "../../components/CarouselInicio";
export default function Home() {
  return (
    <>
      <CarouselInicio></CarouselInicio>
      <Route component={ListaEventos} path="/" />
    </>
  );
}
