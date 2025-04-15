import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getDatacatalogos, addDatacatalogo, updateDatacatalogo, deleteDatacatalogo } from "../../services/admin/datacatalogo-service";

const Datacatalogo = () => {
  const [datacatalogos, setDatacatalogos] = useState([]);
  const [form, setForm] = useState({
    cod_catalogo: "",
    cod_datacat: "",
    des_datacat: "",
    des_larga: "",
    fec_creacion: "",
  });
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedDatacatalogo, setSelectedDatacatalogo] = useState(null);

  useEffect(() => {
    fetchDatacatalogos();
  }, []);

  const fetchDatacatalogos = async () => {
    const data = await getDatacatalogos();
    setDatacatalogos(data);
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
    await addDatacatalogo(form);
    fetchDatacatalogos();
    handleCloseAdd();
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      cod_catalogo: "",
      cod_datacat: "",
      des_datacat: "",
      des_larga: "",
      fec_creacion: "",
    });
  };

  const handleShowEdit = (datacatalogo) => {
    setSelectedDatacatalogo(datacatalogo);
    setForm({
      cod_catalogo: datacatalogo.cod_catalogo,
      cod_datacat: datacatalogo.cod_datacat,
      des_datacat: datacatalogo.des_datacat,
      des_larga: datacatalogo.des_larga,
      fec_creacion: datacatalogo.fec_creacion,
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      cod_catalogo: "",
      cod_datacat: "",
      des_datacat: "",
      des_larga: "",
      fec_creacion: "",
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateDatacatalogo(selectedDatacatalogo.cod_catalogo, form);
    fetchDatacatalogos();
    handleCloseEdit();
  };

  const handleShowDelete = (datacatalogo) => {
    setSelectedDatacatalogo(datacatalogo);
    setShowDelete(true);
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deleteDatacatalogo(selectedDatacatalogo.cod_catalogo);
    fetchDatacatalogos();
    setShowDelete(false);
  };

  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Datacatálogos</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
              <Button id="agregarDatacatalogo" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabDatacatalogo">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Código de Catálogo</th>
                  <th>Código de DataCat</th>
                  <th>Descripción</th>
                  <th>Descripción Larga</th>
                  <th>Fecha de Creación</th>
                </tr>
              </thead>
              <tbody>{datacatalogos.map((datacatalogo, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={() => handleShowEdit(datacatalogo)}> <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={() => handleShowDelete(datacatalogo)}> <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{datacatalogo.cod_catalogo}</td>
                  <td>{datacatalogo.cod_datacat}</td>
                  <td>{datacatalogo.des_datacat}</td>
                  <td>{datacatalogo.des_larga}</td>
                  <td>{datacatalogo.fec_creacion}</td>
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
                <Form.Group controlId="cod_datacat">
                  <Form.Label>Código de DataCat</Form.Label>
                  <Form.Control type="text" name="cod_datacat" value={form.cod_datacat} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_datacat">
                  <Form.Label>Descripción de DataCat</Form.Label>
                  <Form.Control type="text" name="des_datacat" value={form.des_datacat} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_larga">
                  <Form.Label>Descripción Larga</Form.Label>
                  <Form.Control type="text" name="des_larga" value={form.des_larga} onChange={handleChange} />
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
          <Modal.Title>Editar DataCatálogo</Modal.Title>
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
                <Form.Group controlId="cod_datacat">
                  <Form.Label>Código de DataCat</Form.Label>
                  <Form.Control type="text" name="cod_datacat" value={form.cod_datacat} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_datacat">
                  <Form.Label>Descripción de DataCat</Form.Label>
                  <Form.Control type="text" name="des_datacat" value={form.des_datacat} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_larga">
                  <Form.Label>Descripción Larga</Form.Label>
                  <Form.Control type="text" name="des_larga" value={form.des_larga} onChange={handleChange} />
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
          <Modal.Title>Eliminar DataCatálogo</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar el DataCatálogo: <strong>{selectedDatacatalogo && selectedDatacatalogo.des_datacat}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          <Button variant="secondary" onClick={handleCloseDelete}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Datacatalogo;