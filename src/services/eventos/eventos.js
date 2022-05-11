import React from "react";
import axios from "axios";

export function postEventos(evento) {
  return axios
    .post("http://localhost:8000/eventos", {
      evento: evento,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
