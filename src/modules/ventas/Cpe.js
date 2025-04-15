import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import { getCpes, addCpe, updateCpe, deleteCpe } from "../../services/ventas/cpe-service";

const Cpe = () => {
  const [cpes, setCpes] = useState([]);
  const [form, setForm] = useState({
    cod_cpe: "",
    num_serie: "",
    num_cpe: "",
    fec_emision: "",
    cod_tipdocrec: "",
    num_docrecep: "",
    des_nomrecep: "",
    cod_moneda: "",
    mto_tipocambio: "",
    mto_totalvta: "",
    mto_totaligv: "",
    mto_imptotal: ""
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCpe, setSelectedCpe] = useState(null);

  useEffect(() => {
    fetchCpes();
  }, []);

  const fetchCpes = async () => {
    const data = await getCpes();
    setCpes(data);
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
    await addCpe(form);
    fetchCpes();
    handleCloseAdd();
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setForm({
      cod_cpe: "",
      num_serie: "",
      num_cpe: "",
      fec_emision: "",
      cod_tipdocrec: "",
      num_docrecep: "",
      des_nomrecep: "",
      cod_moneda: "",
      mto_tipocambio: "",
      mto_totalvta: "",
      mto_totaligv: "",
      mto_imptotal: ""
    });
  };

  const handleShowEdit = (cpe) => {
    setSelectedCpe(cpe);
    setForm({
      cod_cpe: cpe.cod_cpe,
      num_serie: cpe.num_serie,
      num_cpe: cpe.num_cpe,
      fec_emision: cpe.fec_emision,
      cod_tipdocrec: cpe.cod_tipdocrec,
      num_docrecep: cpe.num_docrecep,
      des_nomrecep: cpe.des_nomrecep,
      cod_moneda: cpe.cod_moneda,
      mto_tipocambio: cpe.mto_tipocambio,
      mto_totalvta: cpe.mto_totalvta,
      mto_totaligv: cpe.mto_totaligv,
      mto_imptotal: cpe.mto_imptotal
    });
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setForm({
      cod_cpe: "",
      num_serie: "",
      num_cpe: "",
      fec_emision: "",
      cod_tipdocrec: "",
      num_docrecep: "",
      des_nomrecep: "",
      cod_moneda: "",
      mto_tipocambio: "",
      mto_totalvta: "",
      mto_totaligv: "",
      mto_imptotal: ""
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateCpe(selectedCpe.num_cpe, form);
    fetchCpes();
    handleCloseEdit();
  };

  const handleShowDelete = (cpe) => {
    setSelectedCpe(cpe);
    setShowDelete(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = async () => {
    await deleteCpe(selectedCpe.num_cpe);
    fetchCpes();
    setShowDelete(false);
  };
  return (
    <Container fluid className="p-0">
      <Card>
        <Card.Body className="p-3">
          <Card.Title className="mb-3">Comprobantes de Pago Electrónicos (CPE)</Card.Title>
          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-start mb-2 mb-md-0">
            <Button id="agregarCpe" className="mr-2" onClick={handleShowAdd} title="Agregar">
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
          <div className="table-responsive" id="tabCpe">
            <Table>
              <caption>Datatable</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opciones</th>
                  <th>Código</th>
                  <th>Serie</th>
                  <th>Número</th>
                  <th>Fecha de Emisión</th>
                  <th>Tipo Documento Receptor</th>
                  <th>Nombre del Receptor</th>
                  <th>Moneda</th>
                  <th>Total Venta</th>
                </tr>
              </thead>
              <tbody>{cpes.map((cpe, index) => ( 
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="btn-group" role="group">
                      <Button type="button" className="btn btn-secondary btn-sm mb-1" title="Editar" onClick={()=> handleShowEdit(cpe)} > <i className="fa fa-pencil"></i>
                      </Button>
                      <Button type="button" className="btn btn-danger btn-sm mb-1 ml-1" title="Eliminar" onClick={()=> handleShowDelete(cpe)} > <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </td>
                  <td>{cpe.cod_cpe}</td>
                  <td>{cpe.num_serie}</td>
                  <td>{cpe.num_cpe}</td>
                  <td>{cpe.fec_emision}</td>
                  <td>{cpe.cod_tipdocrec}</td>
                  <td>{cpe.des_nomrecep}</td>
                  <td>{cpe.cod_moneda}</td>
                  <td>{cpe.mto_totalvta}</td>
                </tr>
                ))}
                </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card> 
      {/* Modal para agregar cpe */} 
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar CPE</Modal.Title>
        </Modal.Header>
        <Form id="formRegistro" autoComplete="off" onSubmit={handleSubmitAdd}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="cod_cpe">
                <Form.Label>Código CPE</Form.Label>
                <Form.Control type="text" name="cod_cpe" value={form.cod_cpe} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_serie">
                <Form.Label>Serie</Form.Label>
                <Form.Control type="text" name="num_serie" value={form.num_serie} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_cpe">
                <Form.Label>Número de CPE</Form.Label>
                <Form.Control type="text" name="num_cpe" value={form.num_cpe} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="fec_emision">
                <Form.Label>Fecha de Emisión</Form.Label>
                <Form.Control type="date" name="fec_emision" value={form.fec_emision} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="cod_tipdocrec">
                <Form.Label>Tipo Documento Receptor                 </Form.Label>
                <Form.Control type="text" name="cod_tipdocrec" value={form.cod_tipdocrec} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_docrecep">
                <Form.Label>Número de Documento del Receptor</Form.Label>
                <Form.Control type="text" name="num_docrecep" value={form.num_docrecep} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
              <Form.Group controlId="des_nomrecep">
                <Form.Label>Nombre del Receptor</Form.Label>
                <Form.Control type="text" name="des_nomrecep" value={form.des_nomrecep} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="cod_moneda">
                <Form.Label>Moneda</Form.Label>
                <Form.Control type="text" name="cod_moneda" value={form.cod_moneda} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="mto_tipocambio">
                <Form.Label>Tipo de Cambio</Form.Label>
                <Form.Control type="text" name="mto_tipocambio" value={form.mto_tipocambio} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4} className="mb-3">
              <Form.Group controlId="mto_totalvta">
                <Form.Label>Total Venta</Form.Label>
                <Form.Control type="text" name="mto_totalvta" value={form.mto_totalvta} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
              <Form.Group controlId="mto_totaligv">
                <Form.Label>Total IGV</Form.Label>
                <Form.Control type="text" name="mto_totaligv" value={form.mto_totaligv} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
              <Form.Group controlId="mto_imptotal">
                <Form.Label>Importe Total</Form.Label>
                <Form.Control type="text" name="mto_imptotal" value={form.mto_imptotal} onChange={handleChange} />
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
      {/* Modal para editar CPE */} 
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar CPE</Modal.Title>
        </Modal.Header>
        <Form id="formEdicion" autoComplete="off" onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="cod_cpe">
                <Form.Label>Código CPE</Form.Label>
                <Form.Control type="text" name="cod_cpe" value={form.cod_cpe} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_serie">
                <Form.Label>Serie</Form.Label>
                <Form.Control type="text" name="num_serie" value={form.num_serie} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_cpe">
                <Form.Label>Número de CPE</Form.Label>
                <Form.Control type="text" name="num_cpe" value={form.num_cpe} onChange={handleChange} required />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="fec_emision">
                <Form.Label>Fecha de Emisión</Form.Label>
                <Form.Control type="date" name="fec_emision" value={form.fec_emision} onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="cod_tipdocrec">
                <Form.Label>Tipo Documento Receptor</Form.Label>
                <Form.Control type="text" name="cod_tipdocrec" value={form.cod_tipdocrec} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="num_docrecep">
                <Form.Label>Número de Documento del Receptor</Form.Label>
                <Form.Control type="text" name="num_docrecep" value={form.num_docrecep} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
              <Form.Group controlId="des_nomrecep">
                <Form.Label>Nombre del Receptor</Form.Label>
                <Form.Control type="text" name="des_nomrecep" value={form.des_nomrecep} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
              <Form.Group controlId="cod_moneda">
                <Form.Label>Moneda</Form.Label>
                <Form.Control type="text" name="cod_moneda" value={form.cod_moneda} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group controlId="mto_tipocambio">
                <Form.Label>Tipo de Cambio</Form.Label>
                <Form.Control type="text" name="mto_tipocambio" value={form.mto_tipocambio} onChange={handleChange} />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4} className="mb-3">
              <Form.Group controlId="mto_totalvta">
                <Form.Label>Total Venta</Form.Label>
                <Form.Control type="text" name="mto_totalvta" value={form.mto_totalvta} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
              <Form.Group controlId="mto_totaligv">
                <Form.Label>Total IGV</Form.Label>
                <Form.Control type="text" name="mto_totaligv" value={form.mto_totaligv} onChange={handleChange} />
              </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
              <Form.Group controlId="mto_imptotal">
                <Form.Label>Importe Total</Form.Label>
                <Form.Control type="text" name="mto_imptotal" value={form.mto_imptotal} onChange={handleChange} />
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
      {/* Modal para eliminar CPE */} 
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar CPE</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Estás seguro de que deseas eliminar el CPE:{" "} <strong>{selectedCpe && selectedCpe.cod_cpe}</strong>? </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          <Button variant="secondary" onClick={handleCloseDelete}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cpe;
