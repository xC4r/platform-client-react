import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getMenus, addMenu, updateMenu, deleteMenu } from "../../services/admin/menu-service";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({
    num_menu: "",
    des_menu: "",
    des_url: "",
    cod_menu: "",
    cod_icono: "",
    num_menusup: "",
    num_orden: "",
    ind_estado: 1,
    fec_creacion: "",
    fec_modif: ""
  });
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const data = await getMenus();
    setMenus(data);
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
    await addMenu(form);
    fetchMenus();
    handleCloseAdd();
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      num_menu: "",
      des_menu: "",
      des_url: "",
      cod_menu: "",
      cod_icono: "",
      num_menusup: "",
      num_orden: "",
      ind_estado: 1,
      fec_creacion: "",
      fec_modif: ""
    });
  };

  const handleShowEdit = (menu) => {
    setSelectedMenu(menu);
    setForm({
      num_menu: menu.num_menu,
      des_menu: menu.des_menu,
      des_url: menu.des_url,
      cod_menu: menu.cod_menu,
      cod_icono: menu.cod_icono,
      num_menusup: menu.num_menusup,
      num_orden: menu.num_orden,
      ind_estado: menu.ind_estado,
      fec_creacion: menu.fec_creacion,
      fec_modif: menu.fec_modif
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      num_menu: "",
      des_menu: "",
      des_url: "",
      cod_menu: "",
      cod_icono: "",
      num_menusup: "",
      num_orden: "",
      ind_estado: 1,
      fec_creacion: "",
      fec_modif: ""
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateMenu(selectedMenu.num_menu, form);
    fetchMenus();
    handleCloseEdit();
  };

  const handleShowDelete = (menu) => {
    setSelectedMenu(menu);
    setShowDelete(true);
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deleteMenu(selectedMenu.num_menu);
    fetchMenus();
    setShowDelete(false);
  };

  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Menús</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
              <Button id="agregarMenu" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabMenu">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Número de Menú</th>
                  <th>Descripción</th>
                  <th>URL</th>
                  <th>Código del Menú</th>
                  <th>Ícono</th>
                  <th>Menú Superior</th>
                  <th>Orden</th>
                  <th>Estado</th>
                  <th>Fecha de Creación</th>
                  <th>Fecha de Modificación</th>
                </tr>
              </thead>
              <tbody>{menus.map((menu, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={() => handleShowEdit(menu)}> <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={() => handleShowDelete(menu)}> <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{menu.num_menu}</td>
                  <td>{menu.des_menu}</td>
                  <td>{menu.des_url}</td>
                  <td>{menu.cod_menu}</td>
                  <td>{menu.cod_icono}</td>
                  <td>{menu.num_menusup}</td>
                  <td>{menu.num_orden}</td>
                  <td>{menu.ind_estado ? "Activo" : "Inactivo"}</td>
                  <td>{menu.fec_creacion}</td>
                  <td>{menu.fec_modif}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
      {/* Modal para agregar menú */}
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Menú</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_menu">
                  <Form.Label>Descripción del Menú</Form.Label>
                  <Form.Control type="text" name="des_menu" value={form.des_menu} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_url">
                  <Form.Label>URL</Form.Label>
                  <Form.Control type="text" name="des_url" value={form.des_url} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_menu">
                  <Form.Label>Código del Menú</Form.Label>
                  <Form.Control type="text" name="cod_menu" value={form.cod_menu} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_icono">
                  <Form.Label>Ícono</Form.Label>
                  <Form.Control type="text" name="cod_icono" value={form.cod_icono} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_menusup">
                  <Form.Label>Menú Superior</Form.Label>
                  <Form.Control type="number" name="num_menusup" value={form.num_menusup} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_orden">
                  <Form.Label>Orden</Form.Label>
                  <Form.Control type="number" name="num_orden" value={form.num_orden} onChange={handleChange} />
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
      {/* Modal para editar menú */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Menú</Modal.Title>
        </Modal.Header>
        <Form id="formEdicion" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_menu">
                  <Form.Label>Descripción del Menú</Form.Label>
                  <Form.Control type="text" name="des_menu" value={form.des_menu} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_url">
                  <Form.Label>URL</Form.Label>
                  <Form.Control type="text" name="des_url" value={form.des_url} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_menu">
                  <Form.Label>Código del Menú</Form.Label>
                  <Form.Control type="text" name="cod_menu" value={form.cod_menu} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_icono">
                  <Form.Label>Ícono</Form.Label>
                  <Form.Control type="text" name="cod_icono" value={form.cod_icono} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_menusup">
                  <Form.Label>Menú Superior</Form.Label>
                  <Form.Control type="number" name="num_menusup" value={form.num_menusup} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_orden">
                  <Form.Label>Orden</Form.Label>
                  <Form.Control type="number" name="num_orden" value={form.num_orden} onChange={handleChange} />
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
      {/* Modal para eliminar menú */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Menú</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar el menú: <strong>{selectedMenu && selectedMenu.des_menu}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          <Button variant="secondary" onClick={handleCloseDelete}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Menu;