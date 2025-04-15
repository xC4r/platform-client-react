import React from 'react';
import { Nav, ListGroup, Collapse, Form, Button } from 'react-bootstrap';

const SearchBar = () => (
  <Form className="d-flex mb-2">
    <Form.Control name="search" type="search" placeholder="Buscar" className="me-2" aria-label="Buscar" />
    <Button variant="outline-success">Buscar</Button>
  </Form>
);

const Sidebar = ({ menu, onMenuClick, open, handleToggle }) => {
  const renderMenu = (items, paddingLeft = 0) => {
    return items.map(item => (
      <React.Fragment key={item.cod}>
        <ListGroup.Item
          className="bg-transparent"
          style={{ paddingLeft, paddingRight: '1px' }}
          onClick={() => item.sub && item.sub.length > 0 ? handleToggle(item.cod, item.sub) : onMenuClick(item.url)}
          aria-controls={item.cod}
          cod={item.cod}
        >
          <i className={item.ico}></i> {item.nom}
        </ListGroup.Item>
        {item.sub && item.sub.length > 0 && (
          <Collapse in={open[item.cod]} id={item.cod}>
            <Nav className="flex-column list-group">
              <ListGroup className="rounded-0">
                {renderMenu(item.sub, paddingLeft + 20)}
              </ListGroup>
            </Nav>
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  return (
    <>
      <ListGroup.Item className="bg-transparent"><SearchBar /></ListGroup.Item>
      <Nav className="flex-column list-group">
        <ListGroup className="rounded-0">
          {renderMenu(menu)}
        </ListGroup>
      </Nav>
    </>
  );
};

export default Sidebar;
