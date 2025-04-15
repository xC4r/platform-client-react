import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getCpeSeries, addCpeSerie, updateCpeSerie, deleteCpeSerie } from "../../services/ventas/cpeserie-service";

const CpeSerie = () => {
  const [cpeseries, setCpeSeries] = useState([]);
  const [form, setForm] = useState({
    cod_cpe: "",
    num_serie: "",
    ind_estado: ""
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCpeSerie, setSelectedCpeSerie] = useState(null);

  useEffect(() => {
    fetchCpeSeries();
  }, []);

  const fetchCpeSeries = async () => {
    const data = await getCpeSeries();
    setCpeSeries(data);
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
    await addCpeSerie(form);
    fetchCpeSeries();
    handleCloseAdd();
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      cod_cpe: "",
      num_serie: "",
      ind_estado: ""
    });
  };

  const handleShowEdit = (cpeserie) => {
    setSelectedCpeSerie(cpeserie);
    setForm({
      cod_cpe: cpeserie.cod_cpe,
      num_serie: cpeserie.num_serie,
      ind_estado: cpeserie.ind_estado
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      cod_cpe: "",
      num_serie: "",
      ind_estado: ""
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateCpeSerie(selectedCpeSerie.num_serie, form);
    fetchCpeSeries();
    handleCloseEdit();
  };

  const handleShowDelete = (cpeserie) => {
    setSelectedCpeSerie(cpeserie);
    setShowDelete(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deleteCpeSerie(selectedCpeSerie.num_serie);
    fetchCpeSeries();
    setShowDelete(false);
  };
  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Series de Comprobantes de Pago Electrónicos (CPE)</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
            <Button id="agregarCpeSerie" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabCpeSerie">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Código</th>
                  <th>Serie</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>{cpeseries.map((cpeserie, index) => ( 
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={()=> handleShowEdit(cpeserie)} > <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={()=> handleShowDelete(cpeserie)} > <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{cpeserie.cod_cpe}</td>
                  <td>{cpeserie.num_serie}</td>
                  <td>{cpeserie.ind_estado}</td>
                </tr>
                ))}
                </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card> 
      {/* Modal para agregar CPE Serie */} 
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar CPE Serie</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="cod_cpe">
                <Form.Label>Código CPE</Form.Label>
                <Form.Control type="text" name="cod_cpe" value={form.cod_cpe} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_serie">
                <Form.Label>Serie</Form.Label>
                <Form.Control type="text" name="num_serie" value={form.num_serie} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="ind_estado">
                <Form.Label>Estado</Form.Label>
                <Form.Control type="text" name="ind_estado" value={form.ind_estado} onChange={handleChange} />
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
      {/* Modal para editar CPE Serie */} 
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar CPE Serie</Modal.Title>
        </Modal.Header>
        <Form id="formEdicion" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="cod_cpe">
                <Form.Label>Código CPE</Form.Label>
                <Form.Control type="text" name="cod_cpe" value={form.cod_cpe} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_serie">
                <Form.Label>Serie</Form.Label>
                <Form.Control type="text" name="num_serie" value={form.num_serie} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="ind_estado">
                <Form.Label>Estado</Form.Label>
                <Form.Control type="text" name="ind_estado" value={form.ind_estado} onChange={handleChange} />
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
      {/* Modal para eliminar CPE Serie */} 
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar CPE Serie</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar el CPE Serie:{" "} <strong>{selectedCpeSerie && selectedCpeSerie.num_serie}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          <Button variant="secondary" onClick={handleCloseDelete}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CpeSerie;
