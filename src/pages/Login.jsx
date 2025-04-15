import React, { useState, useEffect } from 'react';
import { Container, Form, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/util';
import { login, validateToken } from '../services/auth-service';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const token = getToken();
      if (token) {
        const isValid = await validateToken();
        if (isValid) {
          navigate("/main");
        }
      }
    };
    checkToken();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/main');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#F5F5F5" }}>
      <Form className="text-center" onSubmit={handleSubmit}>
        <Image src="logo_fer.png" alt="Imagen" width="144" height="144" className="mb-1" />
        <h1 className="mb-4">Tienda</h1>
        <Form.Group controlId="username">
          <Form.Control
            type="text"
            className="form-control form-control-lg"
            pattern="[A-Za-z0-9._\-]{1,30}" // Corrección aquí
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
        <Form.Group className="d-grid gap-2">
          <Button variant="primary" type="submit" className="btn-lg">
            Ingresar
          </Button>
        </Form.Group>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </Form>
    </Container>
  );
}

export default Login;
