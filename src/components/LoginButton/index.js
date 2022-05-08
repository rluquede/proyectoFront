import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() => loginWithRedirect()}
      id="loginButton"
      variant="primary"
      className="btn-margin"
    >
        Iniciar Sesión
    </Button>
  );
}
