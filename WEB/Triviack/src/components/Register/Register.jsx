


import { useForm } from "react-hook-form";
import { createUser, login } from "../../services/api-service";
import { useAuthContext } from "../../context/auth-context";
import { Link } from "react-router-dom";


function Register() {
  const { register, handleSubmit } = useForm();

  const { onLogin } = useAuthContext();

  function handleRegister(formData) {
    createUser(formData)
      .then(() => login(formData))
      .then((user) => onLogin(user))
  }

  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>

          <input
            type="text"
            className="form-control"
            id="name"
            {...register("name")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>

          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Here your password
          </label>
          <input
            {...register("password")}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
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
export default Register
