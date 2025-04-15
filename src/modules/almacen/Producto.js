import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table, Pagination } from 'react-bootstrap';
import { getProductos, addProducto, updateProducto, deleteProducto } from "../../services/almacen/producto-service";

// Constantes para los selectores
const MARCAS = [
  { cod: 'AA', desc: 'Aceros Arequipa' },
  { cod: 'SP', desc: 'SiderPeru' },
  { cod: 'M4', desc: 'Miromina' },
  { cod: 'PR', desc: 'Prodac' },
  { cod: 'ZZ', desc: 'Otra' }
];

const PROVEEDORES = [
  { cod: '1', desc: 'Aceros Arequipa' },
  { cod: '2', desc: 'SiderPeru' },
  { cod: '3', desc: 'Miromina' },
  { cod: '4', desc: 'Prodac' },
  { cod: '99', desc: 'Otra' }
];

const UNIDADES = [
  { cod: 'NIU', desc: 'Unidad (NIU)' },
  { cod: 'BX', desc: 'Caja (BX)' },
  { cod: 'UND', desc: 'Unidad (Und)' },
  { cod: 'VAR', desc: 'Varilla (Var)' },
  { cod: 'PAQ', desc: 'Paquete (Paqu)' },
  { cod: 'RLL', desc: 'Rollo (Rll)' },
  { cod: 'MLL', desc: 'Millar (Mll)' },
  { cod: 'MT3', desc: 'Metro Cubico (Mt3)' },
  { cod: 'TM', desc: 'Tonelada (Tm)' },
  { cod: 'OTR', desc: 'Otra (Otr)' }
];

const CATEGORIAS = [
  { cod: '01', desc: 'Acero' },
  { cod: '02', desc: 'Cemento' },
  { cod: '03', desc: 'Alambres' },
  { cod: '04', desc: 'Clavos' },
  { cod: '05', desc: 'Piedras' },
  { cod: '06', desc: 'Agregados' },
  { cod: '99', desc: 'Otra' }
];

const Producto = () => {
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const [form, setForm] = useState({
    cod_producto: "",
    des_corta: "",
    des_producto: "",
    des_marca: "",
    num_proveedor: "",
    cod_unidad: "",
    cod_categoria: "",
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!form.cod_producto || form.cod_producto.length < 1 || form.cod_producto.length > 5) {
      alert('El código de producto debe tener entre 1 y 5 caracteres');
      return false;
    }
    if (!form.des_corta || form.des_corta.length > 20) {
      alert('La descripción corta es obligatoria y no debe exceder 20 caracteres');
      return false;
    }
    if (!form.cod_unidad) {
      alert('La unidad es obligatoria');
      return false;
    }
    if (form.des_producto && form.des_producto.length > 100) {
      alert('La descripción no debe exceder 100 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await addProducto(form);
      fetchProductos();
      handleCloseAdd();
    }
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      cod_producto: "",
      des_corta: "",
      des_producto: "",
      des_marca: "",
      num_proveedor: "",
      cod_unidad: "",
      cod_categoria: "",
    });
  };

  const handleShowEdit = (producto) => {
    setSelectedProducto(producto);
    setForm({
      cod_producto: producto.cod_producto,
      des_corta: producto.des_corta,
      des_producto: producto.des_producto,
      des_marca: producto.des_marca,
      num_proveedor: producto.num_proveedor,
      cod_unidad: producto.cod_unidad,
      cod_categoria: producto.cod_categoria,
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      cod_producto: "",
      des_corta: "",
      des_producto: "",
      des_marca: "",
      num_proveedor: "",
      cod_unidad: "",
      cod_categoria: "",
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await updateProducto(selectedProducto.num_producto, form);
      fetchProductos();
      handleCloseEdit();
    }
  };

  const handleShowDelete = (producto) => {
    setSelectedProducto(producto);
    setShowDelete(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deleteProducto(selectedProducto.num_producto);
    fetchProductos();
    setShowDelete(false);
  };

  // Funciones helper para obtener descripciones
  const getMarcaDesc = (cod) => {
    const marca = MARCAS.find(m => m.cod === cod);
    return marca ? marca.desc : cod;
  };

  const getProveedorDesc = (cod) => {
    const proveedor = PROVEEDORES.find(p => p.cod === String(cod));
    return proveedor ? proveedor.desc : cod;
  };

  const getCategoriaDesc = (cod) => {
    const categoria = CATEGORIAS.find(c => c.cod === cod);
    return categoria ? categoria.desc : cod;
  };

  const getUnidadDesc = (cod) => {
    const unidad = UNIDADES.find(u => u.cod === cod);
    return unidad ? unidad.desc : cod;
  };

  // Calcular productos para la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(productos.length / productsPerPage);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Productos</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
              <Button id="agregarProducto" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabProducto">
            <Table>
              <caption>Tabla de Productos</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Cod</th>
                  <th>Desc Corta</th>
                  <th>Descripción</th>
                  <th>Marca</th>
                  <th>Proveedor</th>
                  <th>Unidad</th>
                  <th>Categoría</th>
                </tr>
              </thead>
              <tbody>{currentProducts.map((producto, index) => (
                <tr key={index}>
                  <th>{indexOfFirstProduct + index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={() => handleShowEdit(producto)}> <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={() => handleShowDelete(producto)}> <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{producto.cod_producto}</td>
                  <td>{producto.des_corta}</td>
                  <td>{producto.des_producto}</td>
                  <td>{getMarcaDesc(producto.des_marca)}</td>
                  <td>{getProveedorDesc(producto.num_proveedor)}</td>
                  <td>{getUnidadDesc(producto.cod_unidad)}</td>
                  <td>{getCategoriaDesc(producto.cod_categoria)}</td>
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
      {/* Modal para agregar producto */}
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Producto</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_producto">
                  <Form.Label>Código de Producto</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="cod_producto" 
                    value={form.cod_producto} 
                    onChange={handleChange} 
                    required 
                    maxLength={5}
                    minLength={1}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_corta">
                  <Form.Label>Descripción Corta</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="des_corta" 
                    value={form.des_corta} 
                    onChange={handleChange} 
                    required 
                    maxLength={20}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_producto">
                  <Form.Label>Descripción del Producto</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="des_producto" 
                    value={form.des_producto} 
                    onChange={handleChange} 
                    maxLength={100}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_marca">
                  <Form.Label>Marca</Form.Label>
                  <Form.Select 
                    name="des_marca" 
                    value={form.des_marca} 
                    onChange={handleChange} 
                  >
                    <option value="">Seleccione una marca</option>
                    {MARCAS.map(marca => (
                      <option key={marca.cod} value={marca.cod}>{marca.desc}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_proveedor">
                  <Form.Label>Proveedor</Form.Label>
                  <Form.Select 
                    name="num_proveedor" 
                    value={form.num_proveedor} 
                    onChange={handleChange} 
                  >
                    <option value="">Seleccione un proveedor</option>
                    {PROVEEDORES.map(prov => (
                      <option key={prov.cod} value={prov.cod}>{prov.desc}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_unidad">
                  <Form.Label>Unidad</Form.Label>
                  <Form.Select 
                    name="cod_unidad" 
                    value={form.cod_unidad} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Seleccione una unidad</option>
                    {UNIDADES.map(unidad => (
                      <option key={unidad.cod} value={unidad.cod}>{unidad.desc}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_categoria">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select 
                    name="cod_categoria" 
                    value={form.cod_categoria} 
                    onChange={handleChange} 
                  >
                    <option value="">Seleccione una categoría</option>
                    {CATEGORIAS.map(cat => (
                      <option key={cat.cod} value={cat.cod}>{cat.desc}</option>
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
      {/* Modal para editar producto (similar al Modal agregar producto) */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Form id="formEditar" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_producto">
                  <Form.Label>Código de Producto</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="cod_producto" 
                    value={form.cod_producto} 
                    onChange={handleChange} 
                    required 
                    maxLength={5}
                    minLength={1}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_corta">
                  <Form.Label>Descripción Corta</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="des_corta" 
                    value={form.des_corta} 
                    onChange={handleChange} 
                    required 
                    maxLength={20}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_producto">
                  <Form.Label>Descripción del Producto</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="des_producto" 
                    value={form.des_producto} 
                    onChange={handleChange} 
                    maxLength={100}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="des_marca">
                  <Form.Label>Marca</Form.Label>
                  <Form.Select 
                    name="des_marca" 
                    value={form.des_marca} 
                    onChange={handleChange} 
                  >
                    <option value="">Seleccione una marca</option>
                    {MARCAS.map(marca => (
                      <option key={marca.cod} value={marca.cod}>{marca.desc}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="num_proveedor">
                  <Form.Label>Proveedor</Form.Label>
                  <Form.Select 
                    name="num_proveedor" 
                    value={form.num_proveedor} 
                    onChange={handleChange} 
                  >
                    <option value="">Seleccione un proveedor</option>
                    {PROVEEDORES.map(prov => (
                      <option key={prov.cod} value={prov.cod}>{prov.desc}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_unidad">
                  <Form.Label>Unidad</Form.Label>
                  <Form.Select 
                    name="cod_unidad" 
                    value={form.cod_unidad} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Seleccione una unidad</option>
                    {UNIDADES.map(unidad => (
                      <option key={unidad.cod} value={unidad.cod}>{unidad.desc}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="cod_categoria">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select 
                    name="cod_categoria" 
                    value={form.cod_categoria} 
                    onChange={handleChange} 
                  >
                    <option value="">Seleccione una categoría</option>
                    {CATEGORIAS.map(cat => (
                      <option key={cat.cod} value={cat.cod}>{cat.desc}</option>
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
      {/* Modal para eliminar producto */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar el producto:{" "} <strong>{selectedProducto && selectedProducto.des_producto}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}> Eliminar </Button>
          <Button variant="secondary" onClick={handleCloseDelete}> Cancelar </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Producto;

