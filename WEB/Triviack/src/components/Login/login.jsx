import { useForm } from "react-hook-form";
import { login } from "../../services/api-service";
import { useAuthContext } from "../../context/auth-context";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const { register, handleSubmit } = useForm();

  const { onLogin } = useAuthContext();

  function handleLogin(data) {
    login(data).then((response) => {
      onLogin(response);
    });
  }

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            className="form-control"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <Link className="btn btn-link" to="/signup">
          Sign up
        </Link>
      </form>
    </div>
  );
}

export default Login;