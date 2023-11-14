import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo que redirige a / */}
        <NavLink className="navbar-brand" to="/">Logo</NavLink>

        {/* Botón de hamburguesa para pantallas pequeñas */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Opciones centrales */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/fastgame" activeclassname="active">Fast Game</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/competitive-game" activeclassname="active">Competitive Game</NavLink>
            </li>
            <li className={`nav-item dropdown ${location.pathname.startsWith('/another-games') ? 'active' : ''}`}>
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Another games
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="/lucrative-game" activeclassname="active">Lucrative Game</NavLink></li>
                <li><NavLink className="dropdown-item" to="/community-questions" activeclassname="active">Community questions</NavLink></li>
                <li><NavLink className="dropdown-item" to="/section-games" activeclassname="active">Section games</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Botón para hacer login o logout */}
        <div className="d-flex">
          {/* Aquí puedes colocar la lógica para mostrar Login o Logout en función del estado de autenticación */}
          <button className="btn btn-light">Login/Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;