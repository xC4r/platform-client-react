import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getCpeDets, addCpeDet, updateCpeDet, deleteCpeDet } from "../../services/ventas/cpedet-service";

const CpeDet = () => {
  const [cpedets, setCpeDets] = useState([]);
  const [form, setForm] = useState({
    cod_cpe: "",
    num_serie: "",
    num_cpe: "",
    num_item: "",
    cod_rubro: "",
    mto_rubro: "",
    des_rubro: ""
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCpeDet, setSelectedCpeDet] = useState(null);

  useEffect(() => {
    fetchCpeDets();
  }, []);

  const fetchCpeDets = async () => {
    const data = await getCpeDets();
    setCpeDets(data);
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
    await addCpeDet(form);
    fetchCpeDets();
    handleCloseAdd();
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      cod_cpe: "",
      num_serie: "",
      num_cpe: "",
      num_item: "",
      cod_rubro: "",
      mto_rubro: "",
      des_rubro: ""
    });
  };

  const handleShowEdit = (cpedet) => {
    setSelectedCpeDet(cpedet);
    setForm({
      cod_cpe: cpedet.cod_cpe,
      num_serie: cpedet.num_serie,
      num_cpe: cpedet.num_cpe,
      num_item: cpedet.num_item,
      cod_rubro: cpedet.cod_rubro,
      mto_rubro: cpedet.mto_rubro,
      des_rubro: cpedet.des_rubro
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      cod_cpe: "",
      num_serie: "",
      num_cpe: "",
      num_item: "",
      cod_rubro: "",
      mto_rubro: "",
      des_rubro: ""
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateCpeDet(selectedCpeDet.num_item, form);
    fetchCpeDets();
    handleCloseEdit();
  };

  const handleShowDelete = (cpedet) => {
    setSelectedCpeDet(cpedet);
    setShowDelete(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deleteCpeDet(selectedCpeDet.num_item);
    fetchCpeDets();
    setShowDelete(false);
  };
  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Detalles de Comprobantes de Pago Electrónicos (CPE)</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
            <Button id="agregarCpeDet" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabCpeDet">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Código</th>
                  <th>Serie</th>
                  <th>Número</th>
                  <th>Ítem</th>
                  <th>Rubro</th>
                  <th>Monto Rubro</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>{cpedets.map((cpedet, index) => ( 
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={()=> handleShowEdit(cpedet)} > <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={()=> handleShowDelete(cpedet)} > <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{cpedet.cod_cpe}</td>
                  <td>{cpedet.num_serie}</td>
                  <td>{cpedet.num_cpe}</td>
                  <td>{cpedet.num_item}</td>
                  <td>{cpedet.cod_rubro}</td>
                  <td>{cpedet.mto_rubro}</td>
                  <td>{cpedet.des_rubro}</td>
                </tr>
                ))}
                </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card> 
      {/* Modal para agregar CPE Detalle */} 
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar CPE Detalle</Modal.Title>
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
              <Form.Group controlId="num_cpe">
                <Form.Label>Número de CPE</Form.Label>
                <Form.Control type="text" name="num_cpe" value={form.num_cpe} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_item">
                <Form.Label>Número de Ítem</Form.Label>
                <Form.Control type="text" name="num_item" value={form.num_item} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="cod_rubro">
                <Form.Label>Código de Rubro</Form.Label>
                <Form.Control type="text" name="cod_rubro" value={form.cod_rubro} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="mto_rubro">
                <Form.Label>Monto de Rubro</Form.Label>
                <Form.Control type="text" name="mto_rubro" value={form.mto_rubro} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
              <Form.Group controlId="des_rubro">
                <Form.Label>Descripción de Rubro</Form.Label>
                <Form.Control type="text" name="des_rubro" value={form.des_rubro} onChange={handleChange} />
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
      {/* Modal para editar CPE Detalle */} 
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar CPE Detalle</Modal.Title>
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
              <Form.Group controlId="num_cpe">
                <Form.Label>Número de CPE</Form.Label>
                <Form.Control type="text" name="num_cpe" value={form.num_cpe} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_item">
                <Form.Label>Número de Ítem</Form.Label>
                <Form.Control type="text" name="num_item" value={form.num_item} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="cod_rubro">
                <Form.Label>Código de Rubro</Form.Label>
                <Form.Control type="text" name="cod_rubro" value={form.cod_rubro} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="mto_rubro">
                <Form.Label>Monto de Rubro</Form.Label>
                <Form.Control type="text" name="mto_rubro" value={form.mto_rubro} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
              <Form.Group controlId="des_rubro">
                <Form.Label>Descripción de Rubro</Form.Label>
                <Form.Control type="text" name="des_rubro" value={form.des_rubro} onChange={handleChange} />
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
      {/* Modal para eliminar CPE Detalle */} 
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar CPE Detalle</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar el CPE Detalle:{" "} <strong>{selectedCpeDet && selectedCpeDet.cod_cpe}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          <Button variant="secondary" onClick={handleCloseDelete}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CpeDet;
