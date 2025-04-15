import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getProveedores, addProveedor, updateProveedor, deleteProveedor } from "../../services/ventas/proveedores-service";

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [form, setForm] = useState({
    num_proveedor: "",
    num_ruc: "",
    nom_razsocial: "",
    des_contacto: "",
    num_telefono: "",
    des_email: "",
    des_direccion: "",
    ind_estado: ""
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    const data = await getProveedores();
    setProveedores(data);
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
    await addProveedor(form);
    fetchProveedores();
    handleCloseAdd();
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      num_proveedor: "",
      num_ruc: "",
      nom_razsocial: "",
      des_contacto: "",
      num_telefono: "",
      des_email: "",
      des_direccion: "",
      ind_estado: ""
    });
  };

  const handleShowEdit = (proveedor) => {
    setSelectedProveedor(proveedor);
    setForm({
      num_proveedor: proveedor.num_proveedor,
      num_ruc: proveedor.num_ruc,
      nom_razsocial: proveedor.nom_razsocial,
      des_contacto: proveedor.des_contacto,
      num_telefono: proveedor.num_telefono,
      des_email: proveedor.des_email,
      des_direccion: proveedor.des_direccion,
      ind_estado: proveedor.ind_estado
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      num_proveedor: "",
      num_ruc: "",
      nom_razsocial: "",
      des_contacto: "",
      num_telefono: "",
      des_email: "",
      des_direccion: "",
      ind_estado: ""
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateProveedor(selectedProveedor.num_proveedor, form);
    fetchProveedores();
    handleCloseEdit();
  };

  const handleShowDelete = (proveedor) => {
    setSelectedProveedor(proveedor);
    setShowDelete(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deleteProveedor(selectedProveedor.num_proveedor);
    fetchProveedores();
    setShowDelete(false);
  };
  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Proveedores</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
            <Button id="agregarProveedor" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabProveedor">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Razón Social</th>
                  <th>RUC</th>
                  <th>Contacto</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Dirección</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>{proveedores.map((proveedor, index) => ( 
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={()=> handleShowEdit(proveedor)} > <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={()=> handleShowDelete(proveedor)} > <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{proveedor.nom_razsocial}</td>
                  <td>{proveedor.num_ruc}</td>
                  <td>{proveedor.des_contacto}</td>
                  <td>{proveedor.num_telefono}</td>
                  <td>{proveedor.des_email}</td>
                  <td>{proveedor.des_direccion}</td>
                  <td>{proveedor.ind_estado}</td>
                </tr>
                ))}
                </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card> 
      {/* Modal para agregar proveedor */} 
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Proveedor</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_proveedor">
                <Form.Label>Número de Proveedor</Form.Label>
                <Form.Control type="text" name="num_proveedor" value={form.num_proveedor} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_ruc">
                <Form.Label>RUC</Form.Label>
                <Form.Control type="text" name="num_ruc" value={form.num_ruc} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
              <Form.Group controlId="nom_razsocial">
                <Form.Label>Razón Social</Form.Label>
                <Form.Control type="text" name="nom_razsocial" value={form.nom_razsocial} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="des_contacto">
                <Form.Label>Contacto</Form.Label>
                <Form.Control type="text" name="des_contacto" value={form.des_contacto} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_telefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" name="num_telefono" value={form.num_telefono} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="des_email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="des_email" value={form.des_email} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="des_direccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" name="des_direccion" value={form.des_direccion} onChange={handleChange} />
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
      {/* Modal para editar proveedor */} 
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Proveedor</Modal.Title>
        </Modal.Header>
        <Form id="formEdicion" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_proveedor">
                <Form.Label>Número de Proveedor</Form.Label>
                <Form.Control type="text" name="num_proveedor" value={form.num_proveedor} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_ruc">
                <Form.Label>RUC</Form.Label>
                <Form.Control type="text" name="num_ruc" value={form.num_ruc} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
              <Form.Group controlId="nom_razsocial">
                <Form.Label>Razón Social</Form.Label>
                <Form.Control type="text" name="nom_razsocial" value={form.nom_razsocial} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="des_contacto">
                <Form.Label>Contacto</Form.Label>
                <Form.Control type="text" name="des_contacto" value={form.des_contacto} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_telefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" name="num_telefono" value={form.num_telefono} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="des_email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="des_email" value={form.des_email} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="des_direccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" name="des_direccion" value={form.des_direccion} onChange={handleChange} />
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
      {/* Modal para eliminar proveedor */} 
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar el proveedor:{" "} <strong>{selectedProveedor && selectedProveedor.nom_razsocial}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          <Button variant="secondary" onClick={handleCloseDelete}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Proveedores;
