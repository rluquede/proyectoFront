import axios from "axios";

export let entradas = null;
//funcion para crear entradas
export async function postEntradas(userId, eventoId, numeroEntradas, email) {
  let entrada = new Object();
  entrada.userId = userId;
  entrada.eventoId = eventoId;
  entrada.numeroEntradas = numeroEntradas;
  entrada.email = email;
  return axios
    .post("https://apionair.herokuapp.com/entradas", {
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
//funcion para obtener entradas por el id del usuario
export default function getEntradasByUser({ userId }) {
  return fetch(`https://apionair.herokuapp.com/entradas/${userId}`)
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
}
//borrar entrada
export function deleteEntrada(userId, eventoId) {
  return fetch(`https://apionair.herokuapp.com/entradas/${eventoId}?userId=${userId}`, {
    method: "DELETE",
  })
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
}
//actualizar entrada
export function updateEntrada(userId, eventoId, numeroEntradas) {
  return fetch(
    `https://apionair.herokuapp.com/entradas/?userId=${userId}&eventoId=${eventoId}&numeroEntradas=${numeroEntradas}`,
    {
      method: "PUT",
    }
  );
}
//obtener entrada por id de usuario e id de evento
export function getEntrada(userId, eventoId) {
  return fetch(
    `https://apionair.herokuapp.com/entradas/?userId=${userId}&eventoId=${eventoId}`
  )
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return false;
    });
}
//funcion para enviar el correo de las entradas
export function enviarCorreo(entrada) {
  console.log(entrada, "entrada en llamada")
  return fetch("https://apionair.herokuapp.com/email", {
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
