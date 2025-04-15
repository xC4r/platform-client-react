import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table, Pagination } from 'react-bootstrap';
import { getPedidos, addPedido, updatePedido, deletePedido } from "../../services/almacen/pedido-service";
import { getClientes } from "../../services/ventas/clientes-service";

// Constantes para los selectores
const TIPOS_PAGO = [
  { cod: '01', desc: 'Crédito' },
  { cod: '02', desc: 'Contado' }
];

const ESTADOS = [
  { cod: '01', desc: 'Atendido' }
];

const Pedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(20);
  const [form, setForm] = useState({
    num_pedido: "",
    num_cliente: "", // Se actualizará con el primer cliente al cargar los datos
    des_cliente: "",
    fec_pedido: new Date().toISOString().split('T')[0], // Fecha actual
    cod_tipo_pago: "01", // "Crédito" por defecto
    cod_estado: "01" // "Atendido" por defecto
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);

  useEffect(() => {
    fetchPedidos();
    fetchClientes();
  }, []);

  const fetchPedidos = async () => {
    const data = await getPedidos();
    setPedidos(data);
  };

  const fetchClientes = async () => {
    const data = await getClientes();
    // Añadir la opción "Otros" al final de la lista
    const clientesConOtros = [...data, { num_cliente: '999', nom_cliente: 'Otros' }];
    setClientes(clientesConOtros);

    // Setear el primer cliente como valor por defecto
    if (clientesConOtros.length > 0) {
      setForm((prevForm) => ({
        ...prevForm,
        num_cliente: clientesConOtros[0].num_cliente
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!form.num_pedido || !form.num_pedido.startsWith('PA') || form.num_pedido.length > 10) {
      alert('El número de pedido debe comenzar con "PA" y tener máximo 10 caracteres');
      return false;
    }
    if (!form.num_cliente) {
      alert('El cliente es obligatorio');
      return false;
    }
    if (form.num_cliente === '999' && (!form.des_cliente || form.des_cliente.length > 50)) {
      alert('La descripción del cliente es obligatoria y no debe exceder 50 caracteres cuando se selecciona "Otros"');
      return false;
    }
    if (!form.cod_tipo_pago) {
      alert('El tipo de pago es obligatorio');
      return false;
    }
    return true;
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formToSend = {
        ...form,
        cod_tipopago: form.cod_tipo_pago, // Renombrar la llave
      };
      delete formToSend.cod_tipo_pago; // Eliminar la llave antigua
      await addPedido(formToSend);
      fetchPedidos();
      handleCloseAdd();
    }
  };

  const handleShowAdd = () => {
    setShowAdd(true);
    const clienteSeleccionado = clientes.find(c => c.num_cliente === form.num_cliente);
    setForm({
      num_pedido: "",
      num_cliente: clientes.length > 0 ? clientes[0].num_cliente : "", // Primer cliente por defecto
      des_cliente: clienteSeleccionado ? clienteSeleccionado.nom_cliente : "", // Copiar nom_cliente
      fec_pedido: new Date().toISOString().split('T')[0], // Fecha actual
      cod_tipo_pago: "01", // "Crédito" por defecto
      cod_estado: "01" // "Atendido" por defecto
    });
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      num_pedido: "",
      num_cliente: clientes.length > 0 ? clientes[0].num_cliente : "", // Primer cliente por defecto
      des_cliente: "",
      fec_pedido: new Date().toISOString().split('T')[0], // Fecha actual
      cod_tipo_pago: "01", // "Crédito" por defecto
      cod_estado: "01" // "Atendido" por defecto
    });
  };

  const handleShowEdit = (pedido) => {
    const clienteSeleccionado = clientes.find(c => c.num_cliente === pedido.num_cliente);
    setSelectedPedido(pedido);
    setForm({
      num_pedido: pedido.num_pedido,
      num_cliente: pedido.num_cliente,
      des_cliente: clienteSeleccionado ? clienteSeleccionado.nom_cliente : pedido.des_cliente, // Copiar nom_cliente
      fec_pedido: pedido.fec_pedido,
      cod_tipo_pago: pedido.cod_tipo_pago,
      cod_estado: pedido.cod_estado
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      num_pedido: "",
      num_cliente: "",
      des_cliente: "",
      fec_pedido: new Date().toISOString().split('T')[0],
      cod_tipo_pago: "",
      cod_estado: "01"
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formToSend = {
        ...form,
        cod_tipopago: form.cod_tipo_pago, // Renombrar la llave
      };
      delete formToSend.cod_tipo_pago; // Eliminar la llave antigua
      await updatePedido(selectedPedido.num_pedido, formToSend);
      fetchPedidos();
      handleCloseEdit();
    }
  };

  const handleShowDelete = (pedido) => {
    setSelectedPedido(pedido);
    setShowDelete(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deletePedido(selectedPedido.num_pedido);
    fetchPedidos();
    setShowDelete(false);
  };

  // Funciones helper para obtener descripciones
  const getClienteDesc = (num) => {
    const cliente = clientes.find(c => c.num_cliente === num);
    return cliente ? `${cliente.nom_cliente}` : num;
  };

  const getTipoPagoDesc = (cod) => {
    const tipo = TIPOS_PAGO.find(t => t.cod === cod);
    return tipo ? tipo.desc : cod;
  };

  const getEstadoDesc = (cod) => {
    const estado = ESTADOS.find(e => e.cod === cod);
    return estado ? estado.desc : cod;
  };

  // Calcular pedidos para la página actual
  const indexOfLastPedido = currentPage * ordersPerPage;
  const indexOfFirstPedido = indexOfLastPedido - ordersPerPage;
  const currentPedidos = pedidos.slice(indexOfFirstPedido, indexOfLastPedido);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(pedidos.length / ordersPerPage);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Pedidos</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
              <Button id="agregarPedido" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabPedido">
            <Table>
              <caption>Tabla de Pedidos</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>N° Pedido</th>
                  <th>Cliente</th>
                  <th>Descripción Cliente</th>
                  <th>Fecha</th>
                  <th>Tipo Pago</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {currentPedidos.map((pedido, index) => (
                  <tr key={index}>
                    <th>{indexOfFirstPedido + index + 1}</th>
                    <td>
                      <div className="btn-group" role="group">
                        <Button
                          type="button"
                          className="btn btn-secondary btn-sm mb-1"
                          title="Editar"
                          onClick={() => handleShowEdit(pedido)}
                        >
                          <i className="fa fa-pencil"></i>
                        </Button>
                        <Button
                          type="button"
                          className="btn btn-danger btn-sm mb-1 ml-1"
                          title="Eliminar"
                          onClick={() => handleShowDelete(pedido)}
                        >
                          <i className="fa fa-trash-o"></i>
                        </Button>
                      </div>
                    </td>
                    <td>{pedido.num_pedido}</td>
                    <td>{getClienteDesc(pedido.num_cliente)}</td>
                    <td>{pedido.des_cliente}</td>
                    <td>{new Date(pedido.fec_pedido).toLocaleDateString()}</td>
                    <td>{getTipoPagoDesc(pedido.cod_tipopago)}</td>
                    <td>{getEstadoDesc(pedido.cod_estado)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-3">
                <Pagination>
                  <Pagination.First 
                    onClick={() => handlePageChange(1)} 
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last 
                    onClick={() => handlePageChange(totalPages)} 
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Modal para agregar pedido */}
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Pedido</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_pedido">
                  <Form.Label>Número de Pedido</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="num_pedido" 
                    value={form.num_pedido} 
                    onChange={handleChange} 
                    required 
                    maxLength={10}
                    placeholder="PA0001"
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_cliente">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Select 
                    name="num_cliente" 
                    value={form.num_cliente} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Seleccione un cliente</option>
                    {clientes.map(cliente => (
                      <option key={cliente.num_cliente} value={cliente.num_cliente}>
                        {cliente.num_cliente}-{cliente.nom_cliente}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              {form.num_cliente === '999' && (
                <Col md={6} className="mb-3">
                  <Form.Group controlId="des_cliente">
                    <Form.Label>Descripción del Cliente</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="des_cliente" 
                      value={form.des_cliente} 
                      onChange={handleChange} 
                      maxLength={50}
                      required
                    />
                  </Form.Group>
                </Col>
              )}
              <Col md={6} className="mb-3">
                <Form.Group controlId="fec_pedido">
                  <Form.Label>Fecha de Pedido</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="fec_pedido" 
                    value={form.fec_pedido} 
                    onChange={handleChange} 
                    disabled // Bloqueado
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_tipo_pago">
                  <Form.Label>Tipo de Pago</Form.Label>
                  <Form.Select 
                    name="cod_tipo_pago" 
                    value={form.cod_tipo_pago} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Seleccione tipo de pago</option>
                    {TIPOS_PAGO.map(tipo => (
                      <option key={tipo.cod} value={tipo.cod}>{tipo.desc}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_estado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select 
                    name="cod_estado" 
                    value={form.cod_estado} 
                    onChange={handleChange} 
                    disabled // Bloqueado
                  >
                    {ESTADOS.map(estado => (
                      <option key={estado.cod} value={estado.cod}>{estado.desc}</option>
                    ))}
                  </Form.Select>
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

      {/* Modal para editar pedido */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Pedido</Modal.Title>
        </Modal.Header>
        <Form id="formEditar" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_pedido">
                  <Form.Label>Número de Pedido</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="num_pedido" 
                    value={form.num_pedido} 
                    onChange={handleChange} 
                    required 
                    maxLength={10}
                    placeholder="PA0001"
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_cliente">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Select 
                    name="num_cliente" 
                    value={form.num_cliente} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Seleccione un cliente</option>
                    {clientes.map(cliente => (
                      <option key={cliente.num_cliente} value={cliente.num_cliente}>
                        {cliente.num_cliente}-{cliente.nom_cliente}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              {form.num_cliente === '999' && (
                <Col md={6} className="mb-3">
                  <Form.Group controlId="des_cliente">
                    <Form.Label>Descripción del Cliente</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="des_cliente" 
                      value={form.des_cliente} 
                      onChange={handleChange} 
                      maxLength={50}
                      required
                    />
                  </Form.Group>
                </Col>
              )}
              <Col md={6} className="mb-3">
                <Form.Group controlId="fec_pedido">
                  <Form.Label>Fecha de Pedido</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="fec_pedido" 
                    value={form.fec_pedido} 
                    onChange={handleChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_tipo_pago">
                  <Form.Label>Tipo de Pago</Form.Label>
                  <Form.Select 
                    name="cod_tipo_pago" 
                    value={form.cod_tipo_pago} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Seleccione tipo de pago</option>
                    {TIPOS_PAGO.map(tipo => (
                      <option key={tipo.cod} value={tipo.cod}>{tipo.desc}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_estado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select 
                    name="cod_estado" 
                    value={form.cod_estado} 
                    onChange={handleChange} 
                    required
                  >
                    {ESTADOS.map(estado => (
                      <option key={estado.cod} value={estado.cod}>{estado.desc}</option>
                    ))}
                  </Form.Select>
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

      {/* Modal para eliminar pedido */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el pedido:{" "}
          <strong>{selectedPedido && selectedPedido.num_pedido}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}> Eliminar </Button>
          <Button variant="secondary" onClick={handleCloseDelete}> Cancelar </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Pedido;
