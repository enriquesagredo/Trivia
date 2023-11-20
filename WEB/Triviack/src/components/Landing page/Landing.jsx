import { useAuthContext } from "../../context/auth-context";
import Carousel from './Carousel';
import logo from "../../media/Triviack/logo.mp4";

function Landing() {
  const { user } = useAuthContext();

  return (
    <div>
      {user ? (
        // Si hay un usuario logeado, muestra el Carousel
        <Carousel />
      ) : (
        // Si no hay usuario logeado, muestra el video
        <video width="100%" height="500" autoPlay loop muted>
          <source src={logo} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      )}
    </div>
  );
}

export default Landing;