function Register() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <h2 className="text-center mb-4">Registro</h2>

          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Usuario</label>
              <input type="text" className="form-control" id="username" name="username" required />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" id="email" name="email" required />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" name="password" required />
            </div>

            <button type="submit" className="btn btn-primary">Registrarse</button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Register