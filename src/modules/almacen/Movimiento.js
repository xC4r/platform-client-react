import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getMovimientos, addMovimiento, updateMovimiento, deleteMovimiento } from "../../services/almacen/movimiento-service";

const Movimiento = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [form, setForm] = useState({
    num_inventario: "",
    num_producto: "",
    ind_tipmovim: "",
    cnt_movimiento: "",
    des_motivo: "",
    cod_operacion: "",
    cod_cpe: "",
    num_serie: "",
    num_cpe: "",
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedMovimiento, setSelectedMovimiento] = useState(null);

  useEffect(() => {
    fetchMovimientos();
  }, []);

  const fetchMovimientos = async () => {
    const data = await getMovimientos();
    setMovimientos(data);
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
    await addMovimiento(form);
    fetchMovimientos();
    handleCloseAdd();
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      num_inventario: "",
      num_producto: "",
      ind_tipmovim: "",
      cnt_movimiento: "",
      des_motivo: "",
      cod_operacion: "",
      cod_cpe: "",
      num_serie: "",
      num_cpe: "",
    });
  };

  const handleShowEdit = (movimiento) => {
    setSelectedMovimiento(movimiento);
    setForm({
      num_inventario: movimiento.num_inventario,
      num_producto: movimiento.num_producto,
      ind_tipmovim: movimiento.ind_tipmovim,
      cnt_movimiento: movimiento.cnt_movimiento,
      des_motivo: movimiento.des_motivo,
      cod_operacion: movimiento.cod_operacion,
      cod_cpe: movimiento.cod_cpe,
      num_serie: movimiento.num_serie,
      num_cpe: movimiento.num_cpe,
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      num_inventario: "",
      num_producto: "",
      ind_tipmovim: "",
      cnt_movimiento: "",
      des_motivo: "",
      cod_operacion: "",
      cod_cpe: "",
      num_serie: "",
      num_cpe: "",
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateMovimiento(selectedMovimiento.num_movimiento, form);
    fetchMovimientos();
    handleCloseEdit();
  };
  
  const handleDelete = async () => {
    await deleteMovimiento(selectedMovimiento.num_movimiento);
    fetchMovimientos();
    setShowDelete(false);
  };

  const handleShowDelete = (movimiento) => {
    setSelectedMovimiento(movimiento);
    setShowDelete(true);
  };
  
  const handleCloseDelete = () => setShowDelete(false);
  

  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Movimientos de Inventario</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
              <Button id="agregarMovimiento" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabMovimiento">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Inventario</th>
                  <th>Producto</th>
                  <th>Tipo Movimiento</th>
                  <th>Cantidad</th>
                  <th>Motivo</th>
                  <th>Operación</th>
                  <th>Comprobante</th>
                </tr>
              </thead>
              <tbody>{movimientos.map((movimiento, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={() => handleShowEdit(movimiento)}> <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={() => handleShowDelete(movimiento)}> <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{movimiento.num_inventario}</td>
                  <td>{movimiento.num_producto}</td>
                  <td>{movimiento.ind_tipmovim}</td>
                  <td>{movimiento.cnt_movimiento}</td>
                  <td>{movimiento.des_motivo}</td>
                  <td>{movimiento.cod_operacion}</td>
                  <td>{movimiento.cod_cpe}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
      {/* Modal para agregar movimiento */}
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Movimiento</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_inventario">
                  <Form.Label>Inventario</Form.Label>
                  <Form.Control type="text" name="num_inventario" value={form.num_inventario} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_producto">
                  <Form.Label>Producto</Form.Label>
                  <Form.Control type="text" name="num_producto" value={form.num_producto} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="ind_tipmovim">
                  <Form.Label>Tipo de Movimiento</Form.Label>
                  <Form.Control type="text" name="ind_tipmovim" value={form.ind_tipmovim} onChange={handleChange} required autoComplete="off" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cnt_movimiento">
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control type="text" name="cnt_movimiento" value={form.cnt_movimiento} onChange={handleChange} required autoComplete="off" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_motivo">
                  <Form.Label>Motivo</Form.Label>
                  <Form.Control type="text" name="des_motivo" value={form.des_motivo} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_operacion">
                  <Form.Label>Operación</Form.Label>
                  <Form.Control type="text" name="cod_operacion" value={form.cod_operacion} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_cpe">
                  <Form.Label>Comprobante</Form.Label>
                  <Form.Control type="text" name="cod_cpe" value={form.cod_cpe} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_serie">
                  <Form.Label>Serie</Form.Label>
                  <Form.Control type="text" name="num_serie" value={form.num_serie} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_cpe">
                  <Form.Label>Número de Comprobante</Form.Label>
                  <Form.Control type="text" name="num_cpe" value={form.num_cpe} onChange={handleChange} required />
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
      {/* Modal para editar movimiento (similar al Modal agregar movimiento) */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Movimiento</Modal.Title>
        </Modal.Header>
        <Form id="formEditar" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_inventario">
                  <Form.Label>Inventario</Form.Label>
                  <Form.Control type="text" name="num_inventario" value={form.num_inventario} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_producto">
                  <Form.Label>Producto</Form.Label>
                  <Form.Control type="text" name="num_producto" value={form.num_producto} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="ind_tipmovim">
                  <Form.Label>Tipo de Movimiento</Form.Label>
                  <Form.Control type="text" name="ind_tipmovim" value={form.ind_tipmovim} onChange={handleChange} required autoComplete="off" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cnt_movimiento">
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control type="text" name="cnt_movimiento" value={form.cnt_movimiento} onChange={handleChange} required autoComplete="off" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_motivo">
                  <Form.Label>Motivo</Form.Label>
                  <Form.Control type="text" name="des_motivo" value={form.des_motivo} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_operacion">
                  <Form.Label>Operación</Form.Label>
                  <Form.Control type="text" name="cod_operacion" value={form.cod_operacion} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_cpe">
                  <Form.Label>Comprobante</Form.Label>
                  <Form.Control type="text" name="cod_cpe" value={form.cod_cpe} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_serie">
                  <Form.Label>Serie</Form.Label>
                  <Form.Control type="text" name="num_serie" value={form.num_serie} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_cpe">
                  <Form.Label>Número de Comprobante</Form.Label>
                  <Form.Control type="text" name="num_cpe" value={form.num_cpe} onChange={handleChange} required />
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

      {/* Modal para eliminar movimiento */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Movimiento</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar el movimiento:{" "} <strong>{selectedMovimiento && selectedMovimiento.num_movimiento}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}> Eliminar </Button>
          <Button variant="secondary" onClick={handleCloseDelete}> Cancelar </ Button >
        </ Modal.Footer >
      </ Modal >
    </ Container >
  );
};

export default Movimiento;
