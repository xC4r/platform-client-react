import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/auth-service'; // Importar el servicio de usuario

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      navigate('/reset-password'); // Redirigir a ResetPassword
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#F5F5F5" }}>
      <Form className="text-center" onSubmit={handleSubmit}>
        <h1 className="mb-4">Recuperar contraseña?</h1>
        <Form.Group controlId="email">
          <Form.Control
            type="email"
            className="form-control form-control-lg"
            required
            autoFocus
            placeholder="Correo electrónico"
            autoComplete="on"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="d-grid gap-2">
          <Button variant="primary" type="submit" className="mt-2 btn-lg">
            Enviar Código
          </Button>
        </Form.Group>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <p className="mt-2 text-muted">
          © by Gtracks 2022-{new Date().getFullYear()}
        </p>
      </Form>
    </Container>
  );
}

export default ForgotPassword;
