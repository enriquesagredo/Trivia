import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuthContext } from "../../context/auth-context";
import { logoutApi } from "../../services/api-service";
import { Offcanvas, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Navbar/Navbar.css";
import logo from "../../media/Triviack/TriviackLogo.png"

function Navbar() {
  const { user, onLogout } = useAuthContext();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  function logout() {
    logoutApi().then(() => {
      onLogout();
    });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navstyle">
      <div className="container-fluid">
        <NavLink to="/"> 
        <img src={logo} width={200} alt="Logo" className="navbar-logo" />
        </NavLink>

        <Button className="navbar-toggler" onClick={handleShowOffcanvas}>
          <span className="navbar-toggler-icon"></span>
        </Button>

        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/fastgame" activeclassname="active">Fast Game</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/competitivegame" activeclassname="active">Competitive Game</NavLink>
            </li>
            <li className={`nav-item dropdown ${location.pathname.startsWith('/another-games') ? 'active' : ''}`}>
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Another games
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="/lucrative-game" activeclassname="active">Lucrative Game</NavLink></li>
                <li><NavLink className="dropdown-item" to="/community-questions" activeclassname="active">Community questions</NavLink></li>
                <li><NavLink className="dropdown-item" to="/categorygame" activeclassname="active">Categories game</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>

        {user ? (
          <div className="d-flex">
            <Link className="navbar-brand nav-link" onClick={handleShowOffcanvas}>
              {user.name}
            </Link>
            <div>
              <Button variant="light" onClick={logout}>Logout</Button>
            </div>
          </div>
        ) : (
          <div className="d-flex">
            <Link to="/login">
              <button className="btn btn-light">Login/Register</button>
            </Link>
          </div>
        )}

        <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} scroll={true}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Profile information</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p>Try scrolling the rest of the page to see this option in action.</p>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </nav>
  );
}

export default Navbar;