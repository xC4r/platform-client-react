import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getCatalogos, addCatalogo, updateCatalogo, deleteCatalogo } from "../../services/admin/catalogo-service";

const Catalogo = () => {
  const [catalogos, setCatalogos] = useState([]);
  const [form, setForm] = useState({
    cod_catalogo: "",
    des_catalogo: "",
    des_acronimo: "",
    fec_creacion: "",
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCatalogo, setSelectedCatalogo] = useState(null);

  useEffect(() => {
    fetchCatalogos();
  }, []);

  const fetchCatalogos = async () => {
    const data = await getCatalogos();
    setCatalogos(data);
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
    await addCatalogo(form);
    fetchCatalogos();
    handleCloseAdd();
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      cod_catalogo: "",
      des_catalogo: "",
      des_acronimo: "",
      fec_creacion: "",
    });
  };

  const handleShowEdit = (catalogo) => {
    setSelectedCatalogo(catalogo);
    setForm({
      cod_catalogo: catalogo.cod_catalogo,
      des_catalogo: catalogo.des_catalogo,
      des_acronimo: catalogo.des_acronimo,
      fec_creacion: catalogo.fec_creacion,
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      cod_catalogo: "",
      des_catalogo: "",
      des_acronimo: "",
      fec_creacion: "",
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateCatalogo(selectedCatalogo.cod_catalogo, form);
    fetchCatalogos();
    handleCloseEdit();
  };

  const handleShowDelete = (catalogo) => {
    setSelectedCatalogo(catalogo);
    setShowDelete(true);
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deleteCatalogo(selectedCatalogo.cod_catalogo);
    fetchCatalogos();
    setShowDelete(false);
  };

  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Catálogos</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
              <Button id="agregarCatalogo" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabCatalogo">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Acrónimo</th>
                  <th>Fecha de Creación</th>
                </tr>
              </thead>
              <tbody>{catalogos.map((catalogo, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={() => handleShowEdit(catalogo)}> <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={() => handleShowDelete(catalogo)}> <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{catalogo.cod_catalogo}</td>
                  <td>{catalogo.des_catalogo}</td>
                  <td>{catalogo.des_acronimo}</td>
                  <td>{catalogo.fec_creacion}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
      {/* Modal para agregar catálogo */}
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Catálogo</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_catalogo">
                  <Form.Label>Código de Catálogo</Form.Label>
                  <Form.Control type="text" name="cod_catalogo" value={form.cod_catalogo} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_catalogo">
                  <Form.Label>Descripción de Catálogo</Form.Label>
                  <Form.Control type="text" name="des_catalogo" value={form.des_catalogo} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_acronimo">
                  <Form.Label>Acrónimo</Form.Label>
                  <Form.Control type="text" name="des_acronimo" value={form.des_acronimo} onChange={handleChange} required />
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
      {/* Modal para editar catálogo */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Catálogo</Modal.Title>
        </Modal.Header>
        <Form id="formEdicion" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_catalogo">
                  <Form.Label>Código de Catálogo</Form.Label>
                  <Form.Control type="text" name="cod_catalogo" value={form.cod_catalogo} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_catalogo">
                  <Form.Label>Descripción de Catálogo</Form.Label>
                  <Form.Control type="text" name="des_catalogo" value={form.des_catalogo} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_acronimo">
                  <Form.Label>Acrónimo</Form.Label>
                  <Form.Control type="text" name="des_acronimo" value={form.des_acronimo} onChange={handleChange} required />
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
      {/* Modal para eliminar catálogo */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Catálogo</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar el catálogo: <strong>{selectedCatalogo && selectedCatalogo.des_catalogo}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}></Button>
          <Button variant="secondary" onClick={handleCloseDelete}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
      );
    };

    export default Catalogo;
