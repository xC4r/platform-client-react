import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getUsuarios, addUsuario, updateUsuario, deleteUsuario } from "../../services/admin/usuario-service";

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    codigo: "",
    tipoDocumento: "",
    numDocumento: "",
    nombre: "",
    password: "",
    correo: "",
    rol: "",
    estado: "",
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    await addUsuario(form);
    fetchUsuarios();
    handleCloseAdd();  // Modificado
  };  

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      codigo: "",
      tipoDocumento: "",
      numDocumento: "",
      nombre: "",
      password: "",
      correo: "",
      rol: "",
      estado: "",
    });
  };  

  const handleShowEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setForm({
      codigo: usuario.codigo,
      tipoDocumento: usuario.tipoDocumento,
      numDocumento: usuario.numDocumento,
      nombre: usuario.nombre,
      password: usuario.password,
      correo: usuario.correo,
      rol: usuario.rol,
      estado: usuario.estado,
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      codigo: "",
      tipoDocumento: "",
      numDocumento: "",
      nombre: "",
      password: "",
      correo: "",
      rol: "",
      estado: "",
    });
  };
  
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateUsuario(selectedUsuario.numDocumento, form);
    fetchUsuarios();
    handleCloseEdit();  // Modificado
  };

  const handleShowDelete = (usuario) => {
    setSelectedUsuario(usuario);
    setShowDelete(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deleteUsuario(selectedUsuario.numDocumento);
    fetchUsuarios();
    setShowDelete(false);
  };

  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Usuarios</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
            <Button id="agregarUsuario" className="mr-2" onClick={handleShowAdd} title="Agregar">
              <i className="fa fa-plus"></i>
            </Button>
            <Form.Group className="flex-grow-1">
              <Form.Control type="text" placeholder="Buscar" id="txtBuscar" className="rounded" />
            </Form.Group>
            <Button type="button" className="btn btn-secondary ml-2" title="Filtrar">
              <i className="fa fa-search"></i>
            </Button>
            </Col>
          </Row>
          <div className="table-responsive" id="tabUsuario">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Nombre</th>
                  <th>Correo Electrónico</th>
                  <th>Documento</th>
                  <th>Rol</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>{usuarios.map((usuario, index) => ( 
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={()=> handleShowEdit(usuario)} > <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={()=> handleShowDelete(usuario)} > <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.numDocumento}</td>
                  <td>{usuario.desRol}</td>
                  <td>{usuario.desEstado}</td>
                </tr>
                ))}
                </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card> 
      {/* Modal para agregar usuario */} 
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Usuario</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="codigo">
                <Form.Label>Código de Usuario</Form.Label>
                <Form.Control type="text" name="codigo" value={form.codigo} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={2} className="mb-3">
              <Form.Group controlId="tipoDocumento">
                <Form.Label>Tipo Doc</Form.Label>
                <Form.Control type="text" name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
              <Form.Group controlId="numDocumento">
                <Form.Label>Número de Documento</Form.Label>
                <Form.Control type="text" name="numDocumento" value={form.numDocumento} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="nombre">
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control type="text" name="nombre" value={form.nombre} onChange={handleChange} required autoComplete="off"/>
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required autoComplete="off"/>
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="correo">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" name="correo" value={form.correo} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
              <Form.Group controlId="rol">
                <Form.Label>Rol</Form.Label>
                <Form.Control as="select" name="rol" value={form.rol} onChange={handleChange} required>
                  <option value="">Seleccione un rol</option>
                  <option value="0">Master</option>
                  <option value="1">Administrador</option>
                  <option value="2">Gerente</option>
                </Form.Control>
              </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
              <Form.Group controlId="estado">
                <Form.Label>Estado</Form.Label>
                <Form.Control as="select" name="estado" value={form.estado} onChange={handleChange} required>
                  <option value="">Seleccione un estado</option>
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </Form.Control>
              </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="outline-primary"> Registrar </Button>
            <Button variant="outline-secondary" onClick={handleCloseAdd}> Cancelar </Button>
          </Modal.Footer>
        </Form>
      </Modal> 
      {/* Modal para editar usuario */} 
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modificar Usuario</Modal.Title>
        </Modal.Header>
        <Form id="formEditar" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="codigo">
                <Form.Label>Código de Usuario</Form.Label>
                <Form.Control type="text" name="codigo" value={form.codigo} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={2} className="mb-3">
              <Form.Group controlId="tipoDocumento">
                <Form.Label>Tipo Doc</Form.Label>
                <Form.Control type="text" name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
              <Form.Group controlId="numDocumento">
                <Form.Label>Número de Documento</Form.Label>
                <Form.Control type="text" name="numDocumento" value={form.numDocumento} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="nombre">
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="correo">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" name="correo" value={form.correo} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
              <Form.Group controlId="rol">
                <Form.Label>Rol</Form.Label>
                <Form.Control as="select" name="rol" value={form.rol} onChange={handleChange} required>
                  <option value="">Seleccione un rol</option>
                  <option value="0">Master</option>
                  <option value="1">Administrador</option>
                  <option value="2">Gerente</option>
                </Form.Control>
              </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
              <Form.Group controlId="estado">
                <Form.Label>Estado</Form.Label>
                <Form.Control as="select" name="estado" value={form.estado} onChange={handleChange} required>
                  <option value="">Seleccione un estado</option>
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </Form.Control>
              </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="outline-primary"> Modificar </Button>
            <Button variant="outline-secondary" onClick={handleCloseEdit}> Cancelar </Button>
          </Modal.Footer>
        </Form>
      </Modal> 
      {/* Modal para eliminar usuario */} 
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar el usuario:{" "} <strong>{selectedUsuario && selectedUsuario.nombre}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}> Eliminar </Button>
          <Button variant="secondary" onClick={handleCloseDelete}> Cancelar </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
  };

export default Usuario;
