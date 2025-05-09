import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignIn,
  faUser,
  faSignOut,
  faHouse,
  faList,
  faBullhorn,
  faFile
} from '@fortawesome/free-solid-svg-icons';

import '../../css/NavBar.css';

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
  const [showingUserDropdown, setShowingUserDropdown] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isLg, setIsLg] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsLg(window.innerWidth >= 992 && window.innerWidth < 1200);
    };
  
    handleResize(); // inicializar
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });


  return (
    <Navbar expand="lg" sticky="top" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
      <Container fluid>
        <Navbar.Toggle aria-controls="navbar" className="custom-toggler">
          <svg width="30" height="30" viewBox="0 0 30 30">
            <path
              d="M4 7h22M4 15h22M4 23h22"
              stroke="var(--navbar-link-color)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeMiterlimit="10"
            />
          </svg>
        </Navbar.Toggle>

        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto gap-2">
            <Nav.Link
              as={Link}
              to="/"
              title="Inicio"
              href="/"
              className={`text-truncate ${expanded ? "mt-3" : ""}`}
              onClick={() => setExpanded(false)}
            >
              <FontAwesomeIcon icon={faHouse} className="me-2" />
              Inicio
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/lista-espera"
              title="Lista de espera"
              className={`text-truncate ${expanded ? "mt-3" : ""}`}
              onClick={() => setExpanded(false)}
            >
              <FontAwesomeIcon icon={faList} className="me-2" />
              Lista de espera
            </Nav.Link>

            <IfAuthenticated>
              <Nav.Link
                as={Link}
                to="/anuncios"
                title="Anuncios"
                className={`text-truncate ${expanded ? "mt-3" : ""}`}
                onClick={() => setExpanded(false)}
              >
                <FontAwesomeIcon icon={faBullhorn} className="me-2" />Anuncios
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/documentacion"
                title="Documentación"
                className={`text-truncate ${expanded ? "mt-3" : ""}`}
                onClick={() => setExpanded(false)}
              >
                <FontAwesomeIcon icon={faFile} className="me-2" />Documentación
              </Nav.Link>
            </IfAuthenticated>

            <IfRole roles={[CONSTANTS.ROLE_ADMIN, CONSTANTS.ROLE_DEV]}>
              <NavGestion onNavigate={() => setExpanded(false)} externalExpanded={expanded} />
            </IfRole>
            <div className="d-lg-none mt-2 ms-2">
              <ThemeButton onlyIcon={isLg} />
            </div>
          </Nav>
        </Navbar.Collapse>

        <div className="d-none d-lg-block me-3">
          <ThemeButton onlyIcon={isLg} />
        </div>

        <Nav className="d-flex flex-md-row flex-column gap-2 ms-auto align-items-center">
          <IfAuthenticated>
            <AnimatedDropdown
              className='end-0 position-absolute'
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
              <Link to="/perfil" className="text-muted dropdown-item nav-link">
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