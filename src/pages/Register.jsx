import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth-service'; // Importar el servicio de usuario

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState(''); // Añadido el estado para repassword
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }
    try {
      await register(username, password);
      setSuccessMessage('Registro exitoso. Redirigiendo al inicio de sesión...');
      setErrorMessage('');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirigir al login después de 2 segundos
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#F5F5F5" }}>
      <Form className="text-center" onSubmit={handleSubmit}>
        <h1 className="mb-4">Register</h1>
        <Form.Group controlId="username">
          <Form.Control
            type="text"
            className="form-control form-control-lg"
            pattern="[A-Za-z0-9._\\-]{1,30}"
            maxLength="30"
            required
            autoFocus
            placeholder="Usuario"
            autoComplete="on"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control
            type="password"
            className="form-control form-control-lg"
            autoComplete="on"
            maxLength="30"
            required
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="repassword">
          <Form.Control
            type="password"
            className="form-control form-control-lg"
            autoComplete="on"
            maxLength="30"
            required
            placeholder="Repetir"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)} // Corregido el manejo del estado
          />
        </Form.Group>
        <Form.Group className="d-grid gap-2">
          <Button variant="primary" type="submit" className="mt-2 btn-lg">
            Registrar
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

export default Register;
