import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getVentasClientes, addVentaCliente, updateVentaCliente, deleteVentaCliente } from "../../services/ventas/ventascliente-service";

const VentasCliente = () => {
  const [ventasClientes, setVentasClientes] = useState([]);
  const [form, setForm] = useState({
    num_venta: "",
    cod_cpe: "",
    num_serie: "",
    num_cpe: "",
    num_cliente: "",
    nom_cliente: "",
    num_doccliente: "",
    fec_emision: "",
    mto_imptotal: ""
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedVentaCliente, setSelectedVentaCliente] = useState(null);

  useEffect(() => {
    fetchVentasClientes();
  }, []);

  const fetchVentasClientes = async () => {
    const data = await getVentasClientes();
    setVentasClientes(data);
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
    await addVentaCliente(form);
    fetchVentasClientes();
    handleCloseAdd();
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      num_venta: "",
      cod_cpe: "",
      num_serie: "",
      num_cpe: "",
      num_cliente: "",
      nom_cliente: "",
      num_doccliente: "",
      fec_emision: "",
      mto_imptotal: ""
    });
  };

  const handleShowEdit = (ventaCliente) => {
    setSelectedVentaCliente(ventaCliente);
    setForm({
      num_venta: ventaCliente.num_venta,
      cod_cpe: ventaCliente.cod_cpe,
      num_serie: ventaCliente.num_serie,
      num_cpe: ventaCliente.num_cpe,
      num_cliente: ventaCliente.num_cliente,
      nom_cliente: ventaCliente.nom_cliente,
      num_doccliente: ventaCliente.num_doccliente,
      fec_emision: ventaCliente.fec_emision,
      mto_imptotal: ventaCliente.mto_imptotal
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      num_venta: "",
      cod_cpe: "",
      num_serie: "",
      num_cpe: "",
      num_cliente: "",
      nom_cliente: "",
      num_doccliente: "",
      fec_emision: "",
      mto_imptotal: ""
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateVentaCliente(selectedVentaCliente.num_venta, form);
    fetchVentasClientes();
    handleCloseEdit();
  };

  const handleShowDelete = (ventaCliente) => {
    setSelectedVentaCliente(ventaCliente);
    setShowDelete(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deleteVentaCliente(selectedVentaCliente.num_venta);
    fetchVentasClientes();
    setShowDelete(false);
  };
  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Ventas por Cliente</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
            <Button id="agregarVentaCliente" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabVentasCliente">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Código CPE</th>
                  <th>Serie</th>
                  <th>Número de CPE</th>
                  <th>Número de Cliente</th>
                  <th>Nombre del Cliente</th>
                  <th>Documento del Cliente</th>
                  <th>Fecha de Emisión</th>
                  <th>Importe Total</th>
                </tr>
              </thead>
              <tbody>{ventasClientes.map((ventaCliente, index) => ( 
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={()=> handleShowEdit(ventaCliente)} > <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={()=> handleShowDelete(ventaCliente)} > <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{ventaCliente.cod_cpe}</td>
                  <td>{ventaCliente.num_serie}</td>
                  <td>{ventaCliente.num_cpe}</td>
                  <td>{ventaCliente.num_cliente}</td>
                  <td>{ventaCliente.nom_cliente}</td>
                  <td>{ventaCliente.num_doccliente}</td>
                  <td>{ventaCliente.fec_emision}</td>
                  <td>{ventaCliente.mto_imptotal}</td>
                </tr>
                ))}
                </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card> 
      {/* Modal para agregar venta de cliente */} 
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Venta de Cliente</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_venta">
                <Form.Label>Número de Venta</Form.Label>
                <Form.Control type="text" name="num_venta" value={form.num_venta} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="cod_cpe">
                <Form.Label>Código CPE</Form.Label>
                <Form.Control type="text" name="cod_cpe" value={form.cod_cpe} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_serie">
                <Form.Label>Serie</Form.Label>
                <Form.Control type="text" name="num_serie" value={form.num_serie} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_cpe">
                <Form.Label>Número de CPE</Form.Label>
                <Form.Control type="text" name="num_cpe" value={form.num_cpe} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_cliente">
                <Form.Label>Número de Cliente</Form.Label>
                <Form.Control type="text" name="num_cliente" value={form.num_cliente} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="nom_cliente">
                <Form.Label>Nombre del Cliente</Form.Label>
                <Form.Control type="text" name="nom_cliente" value={form.nom_cliente} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_doccliente">
              <Form.Label>Número de Documento del Cliente</Form.Label>
                <Form.Control type="text" name="num_doccliente" value={form.num_doccliente} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="fec_emision">
                <Form.Label>Fecha de Emisión</Form.Label>
                <Form.Control type="date" name="fec_emision" value={form.fec_emision} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="mto_imptotal">
                <Form.Label>Importe Total</Form.Label>
                <Form.Control type="text" name="mto_imptotal" value={form.mto_imptotal} onChange={handleChange} />
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
      {/* Modal para editar venta de cliente */} 
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Venta de Cliente</Modal.Title>
        </Modal.Header>
        <Form id="formEdicion" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_venta">
                <Form.Label>Número de Venta</Form.Label>
                <Form.Control type="text" name="num_venta" value={form.num_venta} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="cod_cpe">
                <Form.Label>Código CPE</Form.Label>
                <Form.Control type="text" name="cod_cpe" value={form.cod_cpe} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_serie">
                <Form.Label>Serie</Form.Label>
                <Form.Control type="text" name="num_serie" value={form.num_serie} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_cpe">
                <Form.Label>Número de CPE</Form.Label>
                <Form.Control type="text" name="num_cpe" value={form.num_cpe} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_cliente">
                <Form.Label>Número de Cliente</Form.Label>
                <Form.Control type="text" name="num_cliente" value={form.num_cliente} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="nom_cliente">
                <Form.Label>Nombre del Cliente</Form.Label>
                <Form.Control type="text" name="nom_cliente" value={form.nom_cliente} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_doccliente">
                <Form.Label>Número de Documento del Cliente</Form.Label>
                <Form.Control type="text" name="num_doccliente" value={form.num_doccliente} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="fec_emision">
                <Form.Label>Fecha de Emisión</Form.Label>
                <Form.Control type="date" name="fec_emision" value={form.fec_emision} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="mto_imptotal">
                <Form.Label>Importe Total</Form.Label>
                <Form.Control type="text" name="mto_imptotal" value={form.mto_imptotal} onChange={handleChange} />
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
      {/* Modal para eliminar venta de cliente */} 
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Venta de Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar la venta de cliente:{" "} <strong>{selectedVentaCliente && selectedVentaCliente.nom_cliente}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          <Button variant="secondary" onClick={handleCloseDelete}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default VentasCliente;
