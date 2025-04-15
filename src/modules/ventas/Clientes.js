import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getClientes, addCliente, updateCliente, deleteCliente } from "../../services/ventas/clientes-service";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    num_cliente: "",
    cod_tipcliente: "01", // Default value: Persona Natural
    num_doccliente: "",
    nom_cliente: "",
    num_telefono: "",
    des_email: "",
    des_direccion: "",
    mto_credito: "0", // Default value: 0
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    const data = await getClientes();
    setClientes(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validations
    if (name === "nom_cliente" && value.length > 100) return;
    if (name === "mto_credito" && !/^\d{1,6}(\.\d{1,2})?$/.test(value)) return;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    const formToSend = {
      ...form,
      mto_credito: parseFloat(form.mto_credito), // Convertir mto_credito a número
    };
    await addCliente(formToSend);
    fetchClientes();
    handleCloseAdd();
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      num_cliente: "",
      cod_tipcliente: "01", // Reset to default value
      num_doccliente: "",
      nom_cliente: "",
      num_telefono: "",
      des_email: "",
      des_direccion: "",
      mto_credito: "0", // Reset to default value
    });
  };

  const handleShowEdit = (cliente) => {
    setSelectedCliente(cliente);
    setForm({
      num_cliente: cliente.num_cliente,
      cod_tipcliente: cliente.cod_tipcliente,
      num_doccliente: cliente.num_doccliente,
      nom_cliente: cliente.nom_cliente,
      num_telefono: cliente.num_telefono,
      des_email: cliente.des_email,
      des_direccion: cliente.des_direccion,
      mto_credito: cliente.mto_credito
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      num_cliente: "",
      cod_tipcliente: "01", // Reset to default value
      num_doccliente: "",
      nom_cliente: "",
      num_telefono: "",
      des_email: "",
      des_direccion: "",
      mto_credito: "0", // Reset to default value
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const formToSend = {
      ...form,
      mto_credito: parseFloat(form.mto_credito), // Convertir mto_credito a número
    };
    await updateCliente(selectedCliente.num_cliente, formToSend);
    fetchClientes();
    handleCloseEdit();
  };

  const handleShowDelete = (cliente) => {
    setSelectedCliente(cliente);
    setShowDelete(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deleteCliente(selectedCliente.num_cliente);
    fetchClientes();
    setShowDelete(false);
  };

  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Clientes</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
            <Button id="agregarCliente" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabCliente">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Nombre</th>
                  <th>Correo Electrónico</th>
                  <th>Documento</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Crédito</th>
                </tr>
              </thead>
              <tbody>{clientes.map((cliente, index) => ( 
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={()=> handleShowEdit(cliente)} > <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={()=> handleShowDelete(cliente)} > <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{cliente.nom_cliente}</td>
                  <td>{cliente.des_email}</td>
                  <td>{cliente.num_doccliente}</td>
                  <td>{cliente.num_telefono}</td>
                  <td>{cliente.des_direccion}</td>
                  <td>{cliente.mto_credito}</td>
                </tr>
                ))}
                </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card> 
      {/* Modal para agregar cliente */} 
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Cliente</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="cod_tipcliente">
                <Form.Label>Tipo Cliente</Form.Label>
                <Form.Control
                  as="select"
                  name="cod_tipcliente"
                  value={form.cod_tipcliente}
                  onChange={handleChange}
                  required
                >
                  <option value="01">Persona Natural</option>
                  <option value="02">Empresa</option>
                </Form.Control>
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_doccliente">
                <Form.Label>Número de Documento</Form.Label>
                <Form.Control type="text" name="num_doccliente" value={form.num_doccliente} onChange={handleChange}  />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="nom_cliente">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nom_cliente" value={form.nom_cliente} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_telefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" name="num_telefono" value={form.num_telefono} onChange={handleChange}  />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="des_email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="des_email" value={form.des_email} onChange={handleChange}  />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="des_direccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" name="des_direccion" value={form.des_direccion} onChange={handleChange}  />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="mto_credito">
                <Form.Label>Crédito</Form.Label>
                <Form.Control type="number" name="mto_credito" value={form.mto_credito} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="outline-primary"> Registrar </Button>
            <Button variant="outline-secondary"         onClick={handleCloseAdd}> Cancelar </Button>
          </Modal.Footer>
        </Form>
      </Modal> 
      {/* Modal para editar cliente (similar al Modal agregar cliente) */} 
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Cliente</Modal.Title>
        </Modal.Header>
        <Form id="formEdicion" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="cod_tipcliente">
                <Form.Label>Tipo Cliente</Form.Label>
                <Form.Control
                  as="select"
                  name="cod_tipcliente"
                  value={form.cod_tipcliente}
                  onChange={handleChange}
                  required
                >
                  <option value="01">Persona Natural</option>
                  <option value="02">Empresa</option>
                </Form.Control>
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_doccliente">
                <Form.Label>Número de Documento</Form.Label>
                <Form.Control type="text" name="num_doccliente" value={form.num_doccliente} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="nom_cliente">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nom_cliente" value={form.nom_cliente} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_telefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" name="num_telefono" value={form.num_telefono} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="des_email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="des_email" value={form.des_email} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="des_direccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" name="des_direccion" value={form.des_direccion} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="mto_credito">
                <Form.Label>Crédito</Form.Label>
                <Form.Control type="text" name="mto_credito" value={form.mto_credito} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="outline-primary"> Guardar Cambios </Button>
            <Button variant="outline-secondary" onClick={handleCloseEdit}> Cancelar </Button>
          </Modal.Footer>
        </Form>
      </Modal> 
      {/* Modal para eliminar cliente */} 
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar al cliente:{" "} <strong>{selectedCliente && selectedCliente.nom_cliente}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}> Eliminar </Button>
          <Button variant="secondary" onClick={handleCloseDelete}> Cancelar </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Clientes;
