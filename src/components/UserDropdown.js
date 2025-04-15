import React from 'react';
import { Dropdown } from 'react-bootstrap';

const UserDropdown = ({ onLogout }) => (
  <Dropdown>
    <Dropdown.Toggle variant="transparent" title="Ajustes">
      <i className="fa fa-user" aria-hidden="true"></i>
      <span className="visually-hidden">User Menu</span>
    </Dropdown.Toggle>
    <Dropdown.Menu align="end">
      <Dropdown.Item href="#"><i className="fa fa-user" aria-hidden="true"></i> Perfil</Dropdown.Item>
      <Dropdown.Item href="#"><i className="fa fa-cog" aria-hidden="true"></i> Ajustes</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={onLogout}><i className="fa fa-sign-out" aria-hidden="true"></i> Salir</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default UserDropdown;
