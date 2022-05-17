import axios from "axios";

export let eventos = null;

export async function postEventos(evento) {
  return axios
    .post("http://localhost:8000/eventos", {
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

export const getEventos = fetch("http://localhost:8000/eventos")
  .then((res) => res.json())
  .then((data) => data);

export default function getEvento({ id }) {
  /* axios.get("http://localhost:8000/evento/" + id)
    //.then((res) => res.json())
    .then((response) => {
      const{data=[]} = response
      return data;
    }); */
  return fetch(`http://localhost:8000/evento/${id}`)
    .then((res) => res.json())
    .then((response) => {return response});
}
