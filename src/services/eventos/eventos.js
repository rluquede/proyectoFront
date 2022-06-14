import axios from "axios";

export let eventos = null;

//funcion para crear eventos
export async function postEventos(evento) {
  return axios
    .post("https://apionair.herokuapp.com/eventos", {
      evento: evento,
      header: {
        "Content-type": "application/json",
      },
    })
    .then((response) => {
      return response
    })
    .catch((err) => {
      return err
    });
}
//Funcion para traer los eventos
export const getEventos = fetch("https://apionair.herokuapp.com/eventos")
  .then((res) => res.json())
  .then((data) => data);
//Funcion para traer un  evento por id
export default function getEvento({ id }) {
  return fetch(`https://apionair.herokuapp.com/eventos/${id}`)
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
}
//Funcion para borrar evento
export function deleteEvento(id) {
  return fetch(`https://apionair.herokuapp.com/eventos/${id}`, {
    method: "DELETE",
  })
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
}
//funcion para actualizar evento
export function updateEvento(id, evento) {
  return fetch(`https://apionair.herokuapp.com/eventos/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(evento),
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
}
//Funcion para actualizar el numero de stock de los eventos
export function compra(id, numeroEntradas) {
  return fetch(
    `https://apionair.herokuapp.com/eventos/compra/${id}?numeroEntradas=${numeroEntradas}`,{
      method:"PUT"
    }
  )
    .then((res) => {
      res.json();
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
}
