import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getMenuAsignados, addMenuAsignado, updateMenuAsignado, deleteMenuAsignado } from "../../services/admin/menuAsignado-service";

const MenuAsignado = () => {
  const [menuAsignados, setMenuAsignados] = useState([]);
  const [form, setForm] = useState({
    num_usuario: "",
    num_menu: "",
    fec_asignacion: ""
  });
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedMenuAsignado, setSelectedMenuAsignado] = useState(null);

  useEffect(() => {
    fetchMenuAsignados();
  }, []);

  const fetchMenuAsignados = async () => {
    const data = await getMenuAsignados();
    setMenuAsignados(data);
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
    await addMenuAsignado(form);
    fetchMenuAsignados();
    handleCloseAdd();
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      num_usuario: "",
      num_menu: "",
      fec_asignacion: ""
    });
  };

  const handleShowEdit = (menuAsignado) => {
    setSelectedMenuAsignado(menuAsignado);
    setForm({
      num_usuario: menuAsignado.num_usuario,
      num_menu: menuAsignado.num_menu,
      fec_asignacion: menuAsignado.fec_asignacion
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      num_usuario: "",
      num_menu: "",
      fec_asignacion: ""
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateMenuAsignado(selectedMenuAsignado.num_usuario, selectedMenuAsignado.num_menu, form);
    fetchMenuAsignados();
    handleCloseEdit();
  };

  const handleShowDelete = (menuAsignado) => {
    setSelectedMenuAsignado(menuAsignado);
    setShowDelete(true);
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deleteMenuAsignado(selectedMenuAsignado.num_usuario, selectedMenuAsignado.num_menu);
    fetchMenuAsignados();
    setShowDelete(false);
  };

  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Menús Asignados</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
              <Button id="agregarMenuAsignado" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabMenuAsignado">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Número de Usuario</th>
                  <th>Número de Menú</th>
                  <th>Fecha de Asignación</th>
                </tr>
              </thead>
              <tbody>{menuAsignados.map((menuAsignado, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={() => handleShowEdit(menuAsignado)}> <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={() => handleShowDelete(menuAsignado)}> <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{menuAsignado.num_usuario}</td>
                  <td>{menuAsignado.num_menu}</td>
                  <td>{menuAsignado.fec_asignacion}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
      {/* Modal para agregar menú asignado */}
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Menú Asignado</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_usuario">
                  <Form.Label>Número de Usuario</Form.Label>
                  <Form.Control type="number" name="num_usuario" value={form.num_usuario} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_menu">
                  <Form.Label>Número de Menú</Form.Label>
                  <Form.Control type="number" name="num_menu" value={form.num_menu} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="outline-primary">Registrar</Button>
            <Button variant="outline-secondary" onClick={handleCloseAdd}>Cancelar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* Modal para editar menú asignado */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Menú Asignado</Modal.Title>
        </Modal.Header>
        <Form id="formEdicion" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_usuario">
                  <Form.Label>Número de Usuario</Form.Label>
                  <Form.Control type="number" name="num_usuario" value={form.num_usuario} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_menu">
                  <Form.Label>Número de Menú</Form.Label>
                  <Form.Control type="number" name="num_menu" value={form.num_menu} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="outline-primary">Guardar Cambios</Button>
            <Button variant="outline-secondary" onClick={handleCloseEdit}>Cancelar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* Modal para eliminar menú asignado */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Menú Asignado</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar el menú asignado al usuario: <strong>{selectedMenuAsignado && selectedMenuAsignado.num_usuario}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          <Button variant="secondary" onClick={handleCloseDelete}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MenuAsignado;