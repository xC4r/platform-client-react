import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/auth-service'; // Importar el servicio de usuario

function ResetPassword() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRePassword, setNewRePassword] = useState(''); // Corregido el estado
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== newRePassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }
    try {
      await resetPassword(code, newPassword);
      setSuccessMessage('Su contraseña ha sido restablecida.');
      setErrorMessage('');
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#F5F5F5" }}>
      <Form className="text-center" onSubmit={handleSubmit}>
        <h1 className="mb-4">Restablecer Contraseña</h1>
        <Form.Group controlId="code">
          <Form.Control
            type="text"
            className="form-control form-control-lg"
            required
            autoFocus
            placeholder="Código de 6 dígitos"
            autoComplete="on"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="newPassword">
          <Form.Control
            type="password"
            className="form-control form-control-lg"
            autoComplete="on"
            maxLength="30"
            required
            placeholder="Nueva Contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="newRePassword">
          <Form.Control
            type="password"
            className="form-control form-control-lg"
            autoComplete="on"
            maxLength="30"
            required
            placeholder="Repetir Contraseña"
            value={newRePassword}
            onChange={(e) => setNewRePassword(e.target.value)} // Corregido el manejo del estado
          />
        </Form.Group>
        <Form.Group className="d-grid gap-2">
          <Button variant="primary" type="submit" className="mt-2 btn-lg">
            Restablecer Contraseña
          </Button>
        </Form.Group>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}
        <p className="mt-2 text-muted">
          © by Gtracks 2022-{new Date().getFullYear()}
        </p>
      </Form>
    </Container>
  );
}

export default ResetPassword;
