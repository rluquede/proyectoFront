import axios from "axios";

export let eventos = null;

export async function postEventos(evento) {
  return axios
    .post("http://localhost:8080/eventos", {
      evento: evento,
      header: {
        "Content-type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const getEventos = fetch("http://localhost:8080/eventos")
  .then((res) => res.json())
  .then((data) => data);

export default function getEvento({ id }) {
  return fetch(`http://localhost:8080/eventos/${id}`)
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
}

export function deleteEvento(id) {
  return fetch(`http://localhost:8080/eventos/${id}`, {
    method: "DELETE",
  })
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
}

export function updateEvento(id, evento) {
  return fetch(`http://localhost:8080/eventos/${id}`, {
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

export function compra(id, numeroEntradas) {
  return fetch(
    `http://localhost:8080/eventos/compra/${id}?numeroEntradas=${numeroEntradas}`,{
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
