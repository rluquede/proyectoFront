import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

export default function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <Button
      onClick={() => logout()}
      id="logoutButton"
      variant="link danger"
      className="btn-margin"
    >
        Cerrar Sesión
    </Button>
  );
}
