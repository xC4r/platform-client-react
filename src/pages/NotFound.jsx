import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#F5F5F5" }}>
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <p className="lead">Lo sentimos, la página que buscas no se pudo encontrar.</p>
        <Button variant="primary" onClick={() => navigate('/')}>Regresar al Inicio</Button>
      </div>
    </Container>
  );
}

export default NotFound;
