import React from "react";
import {Container } from "react-bootstrap";
import { Link, useLocation } from "wouter";

export default function Evento(params){
    const [location, setLocation] = useLocation();
    const vista = ()=>{
        setLocation(`/evento/${params.evento.id}`)
    }
    return(
        <Container>
                <p onClick={vista}>{params.evento.titulo}</p> 
        </Container>
       
    )
}