import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getPedidoDetalles, addPedidoDetalle, updatePedidoDetalle, deletePedidoDetalle } from "../../services/almacen/pedidodetalle-service";

const PedidoDetalle = () => {
  const [pedidoDetalles, setPedidoDetalles] = useState([]);
  const [form, setForm] = useState({
    num_pedido_cli: "",
    num_detalleped: "",
    num_producto: "",
    des_producto: "",
    cnt_producto: "",
    mto_precio: "",
    mto_importe: "",
    usu_creacion: "",
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedPedidoDetalle, setSelectedPedidoDetalle] = useState(null);

  useEffect(() => {
    fetchPedidoDetalles();
  }, []);

  const fetchPedidoDetalles = async () => {
    const data = await getPedidoDetalles();
    setPedidoDetalles(data);
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
    await addPedidoDetalle(form);
    fetchPedidoDetalles();
    handleCloseAdd();
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      num_pedido_cli: "",
      num_detalleped: "",
      num_producto: "",
      des_producto: "",
      cnt_producto: "",
      mto_precio: "",
      mto_importe: "",
      usu_creacion: "",
    });
  };

  const handleShowEdit = (pedidoDetalle) => {
    setSelectedPedidoDetalle(pedidoDetalle);
    setForm({
      num_pedido_cli: pedidoDetalle.num_pedido_cli,
      num_detalleped: pedidoDetalle.num_detalleped,
      num_producto: pedidoDetalle.num_producto,
      des_producto: pedidoDetalle.des_producto,
      cnt_producto: pedidoDetalle.cnt_producto,
      mto_precio: pedidoDetalle.mto_precio,
      mto_importe: pedidoDetalle.mto_importe,
      usu_creacion: pedidoDetalle.usu_creacion,
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      num_pedido_cli: "",
      num_detalleped: "",
      num_producto: "",
      des_producto: "",
      cnt_producto: "",
      mto_precio: "",
      mto_importe: "",
      usu_creacion: "",
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updatePedidoDetalle(selectedPedidoDetalle.num_pedido_cli, form);
    fetchPedidoDetalles();
    handleCloseEdit();
  };

  const handleShowDelete = (pedidoDetalle) => {
    setSelectedPedidoDetalle(pedidoDetalle);
    setShowDelete(true);
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deletePedidoDetalle(selectedPedidoDetalle.num_pedido_cli);
    fetchPedidoDetalles();
    setShowDelete(false);
  };

  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Detalles del Pedido</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
              <Button id="agregarPedidoDetalle" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabPedidoDetalle">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Importe</th>
                  <th>Usuario de Creación</th>
                </tr>
              </thead>
              <tbody>{pedidoDetalles.map((pedidoDetalle, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={() => handleShowEdit(pedidoDetalle)}> <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={() => handleShowDelete(pedidoDetalle)}> <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{pedidoDetalle.des_producto}</td>
                  <td>{pedidoDetalle.cnt_producto}</td>
                  <td>{pedidoDetalle.mto_precio}</td>
                  <td>{pedidoDetalle.mto_importe}</td>
                  <td>{pedidoDetalle.usu_creacion}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
      {/* Modal para agregar pedido detalle */}
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Detalle del Pedido</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_pedido_cli">
                  <Form.Label>Número de Pedido Cliente</Form.Label>
                  <Form.Control type="text" name="num_pedido_cli" value={form.num_pedido_cli} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_detalleped">
                  <Form.Label>Número de Detalle del Pedido</Form.Label>
                  <Form.Control type="text" name="num_detalleped" value={form.num_detalleped} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_producto">
                  <Form.Label>Número de Producto</Form.Label>
                  <Form.Control type="text" name="num_producto" value={form.num_producto} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_producto">
                  <Form.Label>Descripción del Producto</Form.Label>
                  <Form.Control type="text" name="des_producto" value={form.des_producto} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cnt_producto">
                  <Form.Label>Cantidad de Producto</Form.Label>
                  <Form.Control type="text" name="cnt_producto" value={form.cnt_producto} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="mto_precio">
                  <Form.Label>Precio del Producto</Form.Label>
                  <Form.Control type="text" name="mto_precio" value={form.mto_precio} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="mto_importe">
                  <Form.Label>Importe Total</Form.Label>
                  <Form.Control type="text" name="mto_importe" value={form.mto_importe} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="usu_creacion">
                  <Form.Label>Usuario de Creación</Form.Label>
                  <Form.Control type="text" name="usu_creacion" value={form.usu_creacion} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="outline-primary"> Registrar </Button>
            <Button variant="outline-secondary" onClick={handleCloseAdd}> Cancelar </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* Modal para editar pedido detalle (similar al Modal agregar pedido detalle) */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Detalle del Pedido</Modal.Title>
        </Modal.Header>
        <Form id="formEdicion" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_pedido_cli">
                  <Form.Label>Número de Pedido Cliente</Form.Label>
                  <Form.Control type="text" name="num_pedido_cli" value={form.num_pedido_cli} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_detalleped">
                  <Form.Label>Número de Detalle del Pedido</Form.Label>
                  <Form.Control type="text" name="num_detalleped" value={form.num_detalleped} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_producto">
                  <Form.Label>Número de Producto</Form.Label>
                  <Form.Control type="text" name="num_producto" value={form.num_producto} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_producto">
                  <Form.Label>Descripción del Producto</Form.Label>
                  <Form.Control type="text" name="des_producto" value={form.des_producto} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cnt_producto">
                  <Form.Label>Cantidad de Producto</Form.Label>
                  <Form.Control type="text" name="cnt_producto" value={form.cnt_producto} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="mto_precio">
                  <Form.Label>Precio del Producto</Form.Label>
                  <Form.Control type="text" name="mto_precio" value={form.mto_precio} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="mto_importe">
                  <Form.Label>Importe Total</Form.Label>
                  <Form.Control type="text" name="mto_importe" value={form.mto_importe} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="usu_creacion">
                  <Form.Label>Usuario de Creación</Form.Label>
                  <Form.Control type="text" name="usu_creacion" value={form.usu_creacion} onChange={handleChange} required />
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
      {/* Modal para eliminar pedido detalle */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Detalle del Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar el detalle del pedido del producto:{" "} <strong>{selectedPedidoDetalle && selectedPedidoDetalle.des_producto}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}> Eliminar </Button>
          <Button variant="secondary" onClick={handleCloseDelete}> Cancelar </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PedidoDetalle;
