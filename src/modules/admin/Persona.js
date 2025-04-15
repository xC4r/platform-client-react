import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getPersonas, addPersona, updatePersona, deletePersona } from "../../services/admin/persona-service";

const Persona = () => {
  const [personas, setPersonas] = useState([]);
  const [form, setForm] = useState({
    num_persona: "",
    cod_tipdoc: "",
    num_documento: "",
    nom_persona: "",
    nom_apellido: "",
    des_email: "",
    num_telefono: "",
    des_direccion: "",
    ind_estado: 1,
    fec_creacion: "",
    fec_modif: ""
  });
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    const data = await getPersonas();
    setPersonas(data);
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
    await addPersona(form);
    fetchPersonas();
    handleCloseAdd();
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      num_persona: "",
      cod_tipdoc: "",
      num_documento: "",
      nom_persona: "",
      nom_apellido: "",
      des_email: "",
      num_telefono: "",
      des_direccion: "",
      ind_estado: 1,
      fec_creacion: "",
      fec_modif: ""
    });
  };

  const handleShowEdit = (persona) => {
    setSelectedPersona(persona);
    setForm({
      num_persona: persona.num_persona,
      cod_tipdoc: persona.cod_tipdoc,
      num_documento: persona.num_documento,
      nom_persona: persona.nom_persona,
      nom_apellido: persona.nom_apellido,
      des_email: persona.des_email,
      num_telefono: persona.num_telefono,
      des_direccion: persona.des_direccion,
      ind_estado: persona.ind_estado,
      fec_creacion: persona.fec_creacion,
      fec_modif: persona.fec_modif
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      num_persona: "",
      cod_tipdoc: "",
      num_documento: "",
      nom_persona: "",
      nom_apellido: "",
      des_email: "",
      num_telefono: "",
      des_direccion: "",
      ind_estado: 1,
      fec_creacion: "",
      fec_modif: ""
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updatePersona(selectedPersona.num_persona, form);
    fetchPersonas();
    handleCloseEdit();
  };

  const handleShowDelete = (persona) => {
    setSelectedPersona(persona);
    setShowDelete(true);
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deletePersona(selectedPersona.num_persona);
    fetchPersonas();
    setShowDelete(false);
  };

  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Personas</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
              <Button id="agregarPersona" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabPersona">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Número de Persona</th>
                  <th>Tipo de Documento</th>
                  <th>Número de Documento</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Estado</th>
                  <th>Fecha de Creación</th>
                  <th>Fecha de Modificación</th>
                </tr>
              </thead>
              <tbody>{personas.map((persona, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={() => handleShowEdit(persona)}> <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={() => handleShowDelete(persona)}> <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{persona.num_persona}</td>
                  <td>{persona.cod_tipdoc}</td>
                  <td>{persona.num_documento}</td>
                  <td>{persona.nom_persona}</td>
                  <td>{persona.nom_apellido}</td>
                  <td>{persona.des_email}</td>
                  <td>{persona.num_telefono}</td>
                  <td>{persona.des_direccion}</td>
                  <td>{persona.ind_estado ? "Activo" : "Inactivo"}</td>
                  <td>{persona.fec_creacion}</td>
                  <td>{persona.fec_modif}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
      {/* Modal para agregar persona */}
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Persona</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_tipdoc">
                  <Form.Label>Tipo de Documento</Form.Label>
                  <Form.Control type="text" name="cod_tipdoc" value={form.cod_tipdoc} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_documento">
                  <Form.Label>Número de Documento</Form.Label>
                  <Form.Control type="text" name="num_documento" value={form.num_documento} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="nom_persona">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" name="nom_persona" value={form.nom_persona} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="nom_apellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control type="text" name="nom_apellido" value={form.nom_apellido} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="des_email" value={form.des_email} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_telefono">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control type="text" name="num_telefono" value={form.num_telefono} onChange={handleChange} />
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
      {/* Modal para editar persona */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Persona</Modal.Title>
        </Modal.Header>
        <Form id="formEdicion" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_tipdoc">
                  <Form.Label>Tipo de Documento</Form.Label>
                  <Form.Control type="text" name="cod_tipdoc" value={form.cod_tipdoc} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_documento">
                  <Form.Label>Número de Documento</Form.Label>
                  <Form.Control type="text" name="num_documento" value={form.num_documento} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="nom_persona">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" name="nom_persona" value={form.nom_persona} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="nom_apellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control type="text" name="nom_apellido" value={form.nom_apellido} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="des_email" value={form.des_email} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_telefono">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control type="text" name="num_telefono" value={form.num_telefono} onChange={handleChange} />
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
      {/* Modal para eliminar persona */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Persona</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar la persona: <strong>{selectedPersona && selectedPersona.nom_persona}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          <Button variant="secondary" onClick={handleCloseDelete}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Persona;