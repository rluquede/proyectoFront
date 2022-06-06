export function enviarCorreoContacto(mensaje) {
    return fetch("http://localhost:8080/email/contacto", {
      headers:{
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(mensaje)
    })
      .then((res) => res.json())
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  }