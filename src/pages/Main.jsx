import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Container, Navbar, Collapse, Nav, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout, validateToken } from '../services/auth-service';
import { getMenu } from '../services/admin/usuario-service';
import UserDropdown from '../components/UserDropdown';
import Sidebar from '../components/Sidebar';
import { removeToken } from '../utils/util';

const Main = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [Module, setModule] = useState(null);
  const [open, setOpen] = useState({});
  const [menuData, setMenuData] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const menuLoadedRef = React.useRef(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const isValid = await validateToken();
        setIsTokenValid(isValid);
        if (!isValid) {
          removeToken();
          navigate('/login');
        }
      } catch (error) {
        console.error('Error validating token:', error);
        setIsTokenValid(false);
        removeToken();
        navigate('/login');
      }
    };
    checkToken();
  }, [navigate]);
  
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      removeToken();
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
    }
  };

  useEffect(() => {
    const loadMenu = async () => {
      if (!isTokenValid || menuLoadedRef.current) return;
      
      try {
        const data = await getMenu();
        console.log('Loading menu data:', data);
        setMenuData(data);
        menuLoadedRef.current = true;
      } catch (error) {
        console.error('Error loading menu:', error);
      }
    };
    loadMenu();
  }, [isTokenValid]);

  const sidebarWidth = isSidebarOpen ? 'auto' : '100%';

  const handleMenuClick = (module) => {
    setModule(module);
    setLoadError(false);
  };

  const handleToggle = (cod, submenu) => {
    setOpen((prevState) => ({
      ...prevState,
      [cod]: !prevState[cod]
    }));

    if (!submenu) {
      setModule(cod);
      setLoadError(false);
    }
  };

  const renderModule = () => {
    if (!Module) return null;

    const ModuleComponent = lazy(() =>
      import(`../modules/${Module}`).catch((error) => {
        console.error('Error loading module:', error);
        setLoadError(true);
      })
    );

    return (
      <Suspense fallback={<div>Cargando...</div>}>
        {loadError ? (
          <div>Error: Módulo o componente no encontrado.</div>
        ) : (
          <ModuleComponent />
        )}
      </Suspense>
    );
  };

  return (
    <div id="wrapper">
      <Navbar expand="lg" className="p-1" bg="light">
        <Container fluid className="p-0">
          <Navbar.Toggle onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-controls="sidebar-collapse" />
          <Navbar.Brand><i className="fa fa-home"></i> Tienda</Navbar.Brand>
          <UserDropdown onLogout={handleLogout} />
        </Container>
      </Navbar>
      <div className="d-flex align-content-start flex-column flex-md-row">
        <Collapse in={isSidebarOpen} className="bg-light" id="sidebar-collapse" style={{ width: sidebarWidth, minWidth: '300px' }}>
          <Nav className="flex-column list-group">
            <ListGroup className="bg-light rounded-0">
              <Sidebar menu={menuData} onMenuClick={handleMenuClick} open={open} handleToggle={handleToggle} />
            </ListGroup>
          </Nav>
        </Collapse>
        <div id="pagina" className="bg-secondary p-1 w-100">
          {renderModule()}
        </div>
      </div>
    </div>
  );
};

export default Main;
