import { useForm } from "react-hook-form";
import { createUser, login } from "../../services/api-service";
import { useAuthContext } from "../../context/auth-context";
import { Link } from "react-router-dom";
import "../Register/register.css"

function Register() {
  const { register, handleSubmit } = useForm();

  const { onLogin } = useAuthContext();

  function handleRegister(formData) {
    createUser(formData)
      .then(() => login(formData))
      .then((user) => onLogin(user))
  }

  return (
    <div className="register-container">
      <h1>Sign Up</h1>

      <form className="register-form" onSubmit={handleSubmit(handleRegister)}>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            {...register("name", { required: true })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email", { required: true })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: true })}
            type="password"
            className="form-control"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>

        <Link className="btn btn-link" to="/login">
          Login
        </Link>
      </form>
    </div>
  );
}

export default Register;
