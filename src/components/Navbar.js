import React, { useState, useEffect } from 'react';
import { Container, Navbar, Dropdown, Collapse, Nav, Button, Form } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';

// Componente para el menú desplegable del usuario
const UserDropdown = () => (
  <Dropdown>
    <Button id="btnThemeChange" variant="transparent">
      <i className="fa fa-moon-o"></i>
    </Button>
    <Dropdown.Toggle id="btnUserDrop" aria-haspopup="true" aria-expanded="false" variant="transparent">
      <i className="fa fa-user"></i>
    </Dropdown.Toggle>
    <Dropdown.Menu align="end">
      <Dropdown.Item href="#" ><i className="fa fa-user"></i> Perfil</Dropdown.Item>
      <Dropdown.Item href="#"><i className="fa fa-cog"></i> Ajustes</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="/logout"><i className="fa fa-sign-out"></i> Salir</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

// Componente para la barra de búsqueda
const SearchBar = () => (
  <Form className="d-flex">
    <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
    <Button variant="outline-success">Search</Button>
  </Form>
);

// Componente principal
function Panel() {
  const [open, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openNivel2, setOpenNivel2] = useState(false);
  const handleToggleNivel2 = () => setOpenNivel2(!openNivel2);
  const [openNivel3, setOpenNivel3] = useState(false);
  const handleToggleNivel3 = () => setOpenNivel3(!openNivel3);

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      setWindowWidth(newWindowWidth);
      setOpen(newWindowWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleToggle = () => {
    setOpen(!open);
  };

  const sidebarWidth = windowWidth >= 768 ? '300px' : '100%';

  return (
    <div id="wrapper">
      <Navbar expand="lg" className="p-1" bg="light">
        <Container fluid className="px-0">
          <Navbar.Toggle onClick={handleToggle} className="float-left" aria-controls="sidebar-collapse" />
          <Navbar.Brand className="ms-2 float-left" href="#"><i className="fa fa-sword"></i> Sword</Navbar.Brand>
          <UserDropdown/>
        </Container>
      </Navbar>
      <div id="cuerpo" className="d-flex align-content-start flex-column flex-md-row">
        <div id="sidebar">
          <Collapse in={open} id="sidebar-collapse" style={{ width: sidebarWidth}}>
            <Nav className="flex-column list-group">
              <ListGroup className="bg-light rounded-0">
                <ListGroup.Item className="bg-transparent"> <SearchBar /> </ListGroup.Item>
                <ListGroup.Item className="bg-transparent" cod="alma"><i className="fa fa-th"></i> Almacen</ListGroup.Item>
                <ListGroup.Item className="bg-transparent" cod="cont" onClick={handleToggleNivel2} aria-controls="Nivel2"><i className="fa fa-table fa-fw"></i> Contabilidad</ListGroup.Item>
                    <Collapse in={openNivel2} id="Nivel2">
                      <Nav className="flex-column list-group">
                        <ListGroup className="bg-light rounded-0">
                          <ListGroup.Item className="bg-transparent" style={{ paddingLeft: '40px' }} cod="cont_rest"><i className="fa fa-minus"></i> Resta de Comprobantes</ListGroup.Item>
                          <ListGroup.Item className="bg-transparent" style={{ paddingLeft: '40px' }} cod="cont_comp" onClick={handleToggleNivel3} aria-controls="Nivel3"><i className="fa fa-plus-square"></i> Comprobante de Pago</ListGroup.Item>
                              <Collapse in={openNivel3} id="Nivel3">
                                <Nav className="flex-column list-group">
                                  <ListGroup className="bg-light rounded-0">
                                    <ListGroup.Item className="bg-transparent" style={{ paddingLeft: '70px' }} cod="cont_comp_nped"><i className="fa fa-check"></i> Nota de Pedido</ListGroup.Item>
                                  </ListGroup>
                                </Nav>
                              </Collapse>
                        </ListGroup>
                      </Nav>
                    </Collapse>                
                <ListGroup.Item className="bg-transparent"><i className="fa fa-table fa-fw"></i> Transportes</ListGroup.Item>
                <ListGroup.Item className="bg-transparent"><i className="fa fa-table fa-fw"></i> Configuracion</ListGroup.Item>

              </ListGroup>

            </Nav>
          </Collapse>
        </div>
        <div id="pagina" className="bg-warning">  
          hola, este es un texto de prueba para comprobar el largo del eleementos y el ancho de la  este es un texto de prueba para comprobar el largo del eleementos y el ancho de la este es un texto de prueba para comprobar el largo del eleementos y el ancho de la pantalñl donde debe terminar
        </div>
      </div>
    </div>
  );
}

export default Panel;