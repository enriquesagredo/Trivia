
import "../Navbar/Navbar.css"
import logo from "../../media/Triviack media/TriviackLogo.png"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navstyle">
  <div className="container-fluid">

    <a className="navbar-brand" href="#">
        <img src={logo} alt="Triviack Logo"/>
        </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Fast Game</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Competitive Game</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Another mode games
          </a>
          <ul id="navbarNavDropdown" className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Lucrative Game</a></li>
            <li><a className="dropdown-item" href="#">Comunnity questions</a></li>
            <li><a className="dropdown-item" href="#">Section games</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar