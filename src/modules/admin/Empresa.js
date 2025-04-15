import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getEmpresas, addEmpresa, updateEmpresa, deleteEmpresa } from "../../services/admin/empresa-service";

const Empresa = () => {
  const [empresas, setEmpresas] = useState([]);
  const [form, setForm] = useState({
    num_empresa: "",
    num_ruc: "",
    nom_razsocial: "",
    des_contacto: "",
    num_telefono: "",
    des_email: "",
    des_direccion: "",
    ind_estado: 1,
    fec_creacion: "",
    fec_modif: ""
  });
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    const data = await getEmpresas();
    setEmpresas(data);
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
    await addEmpresa(form);
    fetchEmpresas();
    handleCloseAdd();
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      num_empresa: "",
      num_ruc: "",
      nom_razsocial: "",
      des_contacto: "",
      num_telefono: "",
      des_email: "",
      des_direccion: "",
      ind_estado: 1,
      fec_creacion: "",
      fec_modif: ""
    });
  };

  const handleShowEdit = (empresa) => {
    setSelectedEmpresa(empresa);
    setForm({
      num_empresa: empresa.num_empresa,
      num_ruc: empresa.num_ruc,
      nom_razsocial: empresa.nom_razsocial,
      des_contacto: empresa.des_contacto,
      num_telefono: empresa.num_telefono,
      des_email: empresa.des_email,
      des_direccion: empresa.des_direccion,
      ind_estado: empresa.ind_estado,
      fec_creacion: empresa.fec_creacion,
      fec_modif: empresa.fec_modif
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      num_empresa: "",
      num_ruc: "",
      nom_razsocial: "",
      des_contacto: "",
      num_telefono: "",
      des_email: "",
      des_direccion: "",
      ind_estado: 1,
      fec_creacion: "",
      fec_modif: ""
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateEmpresa(selectedEmpresa.num_empresa, form);
    fetchEmpresas();
    handleCloseEdit();
  };

  const handleShowDelete = (empresa) => {
    setSelectedEmpresa(empresa);
    setShowDelete(true);
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deleteEmpresa(selectedEmpresa.num_empresa);
    fetchEmpresas();
    setShowDelete(false);
  };

  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Empresas</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
              <Button id="agregarEmpresa" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabEmpresa">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Número de Empresa</th>
                  <th>RUC</th>
                  <th>Razón Social</th>
                  <th>Contacto</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Dirección</th>
                  <th>Estado</th>
                  <th>Fecha de Creación</th>
                  <th>Fecha de Modificación</th>
                </tr>
              </thead>
              <tbody>{empresas.map((empresa, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={() => handleShowEdit(empresa)}> <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={() => handleShowDelete(empresa)}> <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{empresa.num_empresa}</td>
                  <td>{empresa.num_ruc}</td>
                  <td>{empresa.nom_razsocial}</td>
                  <td>{empresa.des_contacto}</td>
                  <td>{empresa.num_telefono}</td>
                  <td>{empresa.des_email}</td>
                  <td>{empresa.des_direccion}</td>
                  <td>{empresa.ind_estado ? "Activo" : "Inactivo"}</td>
                  <td>{empresa.fec_creacion}</td>
                  <td>{empresa.fec_modif}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
      {/* Modal para agregar empresa */}
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Empresa</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_ruc">
                  <Form.Label>Número de RUC</Form.Label>
                  <Form.Control type="text" name="num_ruc" value={form.num_ruc} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="nom_razsocial">
                  <Form.Label>Razón Social</Form.Label>
                  <Form.Control type="text" name="nom_razsocial" value={form.nom_razsocial} onChange={handleChange} required />
                </Form.Group>
              </Col>
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
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="des_email" value={form.des_email} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_direccion">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control type="text" name="des_direccion" value={form.des_direccion} onChange={handleChange} />
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
      {/* Modal para editar empresa */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Empresa</Modal.Title>
        </Modal.Header>
        <Form id="formEdicion" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_ruc">
                  <Form.Label>Número de RUC</Form.Label>
                  <Form.Control type="text" name="num_ruc" value={form.num_ruc} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="nom_razsocial">
                  <Form.Label>Razón Social</Form.Label>
                  <Form.Control type="text" name="nom_razsocial" value={form.nom_razsocial} onChange={handleChange} required />
                </Form.Group>
              </Col>
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
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="des_email" value={form.des_email} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_direccion">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control type="text" name="des_direccion" value={form.des_direccion} onChange={handleChange} />
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
      {/* Modal para eliminar empresa */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar la empresa: <strong>{selectedEmpresa && selectedEmpresa.nom_razsocial}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          <Button variant="secondary" onClick={handleCloseDelete}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Empresa;