import axios from "axios";

export let entradas = null;

export async function postEntradas(userId, eventoId, numeroEntradas, email) {
  let entrada = new Object();
  entrada.userId = userId;
  entrada.eventoId = eventoId;
  entrada.numeroEntradas = numeroEntradas;
  entrada.email = email;
  return axios
    .post("http://localhost:8080/entradas", {
      entrada: entrada,
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

export default function getEntradasByUser({ userId }) {
  return fetch(`http://localhost:8080/entradas/${userId}`)
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
}

export function deleteEntrada(userId, eventoId) {
  return fetch(`http://localhost:8080/entradas/${eventoId}?userId=${userId}`, {
    method: "DELETE",
  })
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
}

export function updateEntrada(userId, eventoId, numeroEntradas) {
  return fetch(
    `http://localhost:8080/entradas/?userId=${userId}&eventoId=${eventoId}&numeroEntradas=${numeroEntradas}`,
    {
      method: "PUT",
    }
  );
}

export function getEntrada(userId, eventoId) {
  return fetch(
    `http://localhost:8080/entradas/?userId=${userId}&eventoId=${eventoId}`
  )
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return false;
    });
}

export function enviarCorreo(entrada) {
  console.log(entrada, "entrada en llamada")
  return fetch("http://localhost:8080/email", {
    headers:{
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(entrada)
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
}
