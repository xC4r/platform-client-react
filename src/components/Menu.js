import React, { useState, useEffect } from 'react';
import { Nav, ListGroup, Collapse } from 'react-bootstrap';

const menu = [{
  "menu": [
    {
      "cod": "admi",
      "nom": "Administracion",
      "ico": "fa fa-table fa-fw",
      "mod": "",
      "sub": [
        {
          "cod": "admi_usua",
          "nom": "Usuarios",
          "ico": "fa fa-users",
          "mod": "Usuario",
          "sub": null
        },
        {
          "cod": "admi_cata",
          "nom": "Catalogo",
          "ico": "fa fa-plus",
          "mod": "Catalogo",
          "sub": null
        }
      ]
    }
  ]
}];

function Menu() {
  const [open, setOpen] = useState({});
  const [Module, setModule] = useState(null);

  useEffect(() => {
  }, [Module]);

  const handleToggle = (cod, submenu) => {
    setOpen({ ...open, [cod]: !open[cod] });
    if (!submenu) {
      setModule(cod);
    }
  };

  const renderSubmenu = (submenu, paddingLeft) => {
    if (!submenu) return null;

    return submenu.map((item) => (
      <React.Fragment key={item.cod}>
        <ListGroup.Item
          className="bg-transparent"
          style={{ paddingLeft, paddingRight: '1px' }}
          onClick={() => handleToggle(item.cod, item.sub)}
          aria-controls={item.cod}
          cod={item.cod}
        >
          <i className={item.ico}></i> {item.nom}
        </ListGroup.Item>
        {item.sub && (
          <Collapse in={open[item.cod]} id={item.cod}>
            <Nav className="flex-column list-group">
              <ListGroup className="rounded-0">
                {renderSubmenu(item.sub, paddingLeft + 30)}
              </ListGroup>
            </Nav>
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Nav className="flex-column list-group">
      <ListGroup className="rounded-0">
        {menu[0].menu.map((item) => (
          <React.Fragment key={item.cod}>
            <ListGroup.Item
              className="bg-transparent"
              style={{ paddingRight: '1px' }}
              onClick={() => handleToggle(item.cod, item.sub)}
              aria-controls={item.cod}
              cod={item.cod}
            >
              <i className={item.ico}></i> {item.nom}
            </ListGroup.Item>
            {item.sub && (
              <Collapse in={open[item.cod]} id={item.cod}>
                <Nav className="flex-column list-group">
                  <ListGroup className="rounded-0">
                    {renderSubmenu(item.sub, 40)}
                  </ListGroup>
                </Nav>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </ListGroup>
    </Nav>
  );
}

export default Menu;

