import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignIn,
  faUser,
  faSignOut
} from '@fortawesome/free-solid-svg-icons';

import '../../css/NavBar.css';

import NavHome from './NavHome';
import NavListaEspera from './NavListaEspera';
import NavHerramientas from './NavHerramientas';
import NavGestion from './NavGestion';
import ThemeButton from '../ThemeButton.jsx';

import IfAuthenticated from '../Auth/IfAuthenticated.jsx';
import IfNotAuthenticated from '../Auth/IfNotAuthenticated.jsx';
import IfRole from '../Auth/IfRole.jsx';

import { Navbar, Nav, Container } from 'react-bootstrap';
import AnimatedDropdown from '../AnimatedDropdown.jsx';

import { CONSTANTS } from '../../util/constants.js';

const NavBar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showingUserDropdown, setShowingUserDropdown] = useState(false);

  useEffect(() => {
    const collapse = document.querySelector(".navbar-collapse");
    if (collapse?.classList.contains("show")) {
      collapse.classList.remove("show");
    }
  }, [location.pathname]);

  return (
    <Navbar expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Toggle aria-controls="main-navbar" className="custom-hamburger" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto gap-2">
            <NavHome />
            <NavListaEspera />
            <NavHerramientas />
            <IfRole roles={[CONSTANTS.ROLE_ADMIN, CONSTANTS.ROLE_DEV]}>
              <NavGestion />
            </IfRole>
            <div className="d-lg-none mt-2 ms-2">
              <ThemeButton />
            </div>
          </Nav>
        </Navbar.Collapse>

        <div className="d-none d-lg-block me-3">
          <ThemeButton />
        </div>

        <Nav className="d-flex flex-md-row flex-column gap-2 ms-auto align-items-center">
          <IfAuthenticated>
            <AnimatedDropdown
              show={showingUserDropdown}
              onMouseEnter={() => setShowingUserDropdown(true)}
              onMouseLeave={() => setShowingUserDropdown(false)}
              onToggle={(isOpen) => setShowingUserDropdown(isOpen)}
              trigger={
                <Link className="nav-link dropdown-toggle fw-bold">
                  @{user?.user_name}
                </Link>
              }
            >
              <Link to="/perfil" className="dropdown-item nav-link">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Mi perfil
              </Link>
              <hr className="dropdown-divider" />
              <Link to="#" className="dropdown-item nav-link" onClick={logout}>
                <FontAwesomeIcon icon={faSignOut} className="me-2" />
                Cerrar sesión
              </Link>
            </AnimatedDropdown>
          </IfAuthenticated>

          <IfNotAuthenticated>
            <Nav.Link as={Link} to="/login" title="Iniciar sesión">
              <FontAwesomeIcon icon={faSignIn} className="me-2" />
              Iniciar sesión
            </Nav.Link>
          </IfNotAuthenticated>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;