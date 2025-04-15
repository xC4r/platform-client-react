import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getInventarios, addInventario, updateInventario, deleteInventario } from "../../services/almacen/inventario-service";

const Inventario = () => {
  const [inventarios, setInventarios] = useState([]);
  const [form, setForm] = useState({
    num_almacen: "",
    num_producto: "",
    cnt_stock: "",
    cnt_stock_min: "",
    mto_pcompra: "",
    mto_pventa: "",
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedInventario, setSelectedInventario] = useState(null);

  useEffect(() => {
    fetchInventarios();
  }, []);

  const fetchInventarios = async () => {
    const data = await getInventarios();
    setInventarios(data);
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
    await addInventario(form);
    fetchInventarios();
    handleCloseAdd();
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      num_almacen: "",
      num_producto: "",
      cnt_stock: "",
      cnt_stock_min: "",
      mto_pcompra: "",
      mto_pventa: "",
    });
  };

  const handleShowEdit = (inventario) => {
    setSelectedInventario(inventario);
    setForm({
      num_almacen: inventario.num_almacen,
      num_producto: inventario.num_producto,
      cnt_stock: inventario.cnt_stock,
      cnt_stock_min: inventario.cnt_stock_min,
      mto_pcompra: inventario.mto_pcompra,
      mto_pventa: inventario.mto_pventa,
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      num_almacen: "",
      num_producto: "",
      cnt_stock: "",
      cnt_stock_min: "",
      mto_pcompra: "",
      mto_pventa: "",
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateInventario(selectedInventario.num_inventario, form);
    fetchInventarios();
    handleCloseEdit();
  };

  const handleShowDelete = (inventario) => {
    setSelectedInventario(inventario);
    setShowDelete(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deleteInventario(selectedInventario.num_inventario);
    fetchInventarios();
    setShowDelete(false);
  };

  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Inventarios</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
              <Button id="agregarInventario" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabInventario">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Almacén</th>
                  <th>Producto</th>
                  <th>Stock</th>
                  <th>Stock Mínimo</th>
                  <th>Precio Compra</th>
                  <th>Precio Venta</th>
                </tr>
              </thead>
              <tbody>{inventarios.map((inventario, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={() => handleShowEdit(inventario)}> <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={() => handleShowDelete(inventario)}> <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{inventario.num_almacen}</td>
                  <td>{inventario.num_producto}</td>
                  <td>{inventario.cnt_stock}</td>
                  <td>{inventario.cnt_stock_min}</td>
                  <td>{inventario.mto_pcompra}</td>
                  <td>{inventario.mto_pventa}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
      {/* Modal para agregar inventario */}
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Inventario</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_almacen">
                  <Form.Label>Almacén</Form.Label>
                  <Form.Control type="text" name="num_almacen" value={form.num_almacen} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_producto">
                  <Form.Label>Producto</Form.Label>
                  <Form.Control type="text" name="num_producto" value={form.num_producto} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cnt_stock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="text" name="cnt_stock" value={form.cnt_stock} onChange={handleChange} required autoComplete="off" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cnt_stock_min">
                  <Form.Label>Stock Mínimo</Form.Label>
                  <Form.Control type="text" name="cnt_stock_min" value={form.cnt_stock_min} onChange={handleChange} required autoComplete="off" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="mto_pcompra">
                  <Form.Label>Precio de Compra</Form.Label>
                  <Form.Control type="text" name="mto_pcompra" value={form.mto_pcompra} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="mto_pventa">
                  <Form.Label>Precio de Venta</Form.Label>
                  <Form.Control type="text" name="mto_pventa" value={form.mto_pventa} onChange={handleChange} required />
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
      {/* Modal para editar inventario (similar al Modal agregar inventario) */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Inventario</Modal.Title>
        </Modal.Header>
        <Form id="formEditar" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_almacen">
                  <Form.Label>Almacén</Form.Label>
                  <Form.Control type="text" name="num_almacen" value={form.num_almacen} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_producto">
                  <Form.Label>Producto</Form.Label>
                  <Form.Control type="text" name="num_producto" value={form.num_producto} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cnt_stock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="text" name="cnt_stock" value={form.cnt_stock} onChange={handleChange} required autoComplete="off" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cnt_stock_min">
                  <Form.Label>Stock Mínimo</Form.Label>
                  <Form.Control type="text" name="cnt_stock_min" value={form.cnt_stock_min} onChange={handleChange} required autoComplete="off" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="mto_pcompra">
                  <Form.Label>Precio de Compra</Form.Label>
                  <Form.Control type="text" name="mto_pcompra" value={form.mto_pcompra} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="mto_pventa">
                  <Form.Label>Precio de Venta</Form.Label>
                  <Form.Control type="text" name="mto_pventa" value={form.mto_pventa} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="outline-primary"> Guardar </Button>
            <Button variant="outline-secondary" onClick={handleCloseEdit}> Cancelar </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* Modal para eliminar inventario */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Inventario</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar el inventario:{" "} <strong>{selectedInventario && selectedInventario.num_producto}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}> Eliminar </Button>
          <Button variant="secondary" onClick={handleCloseDelete}> Cancelar </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Inventario;
