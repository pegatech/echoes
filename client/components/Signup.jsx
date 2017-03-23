const Signup = ({ signup, handleInputChange, state }) => (
  state.isAuthenticated ? (
    <Redirect to="/router/dashboard" />
  ) : (
    <div className="form-signup">
      <form onSubmit={signup}>
        <br />
        <h1 className='signup'>Create a new account</h1>
        <br />
        <fieldset>
          First name:
          <br />
          <input type="text"
            name="user"
            value={state.user}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Name"
            required />
          <br /> Username:
          <br />
          <input type="text"
            name="username"
            value={state.username}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Username"
            required />
          <br /> Password:
          <br />
          <input type="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Password"
            required />
          <br />
          <input className="btn btn-default" type="submit" value="Sign Up" />
          <br />
          <br />
          <Link to="/router/login">I already have an account</Link>
        </fieldset>
      </form>
    </div>
  )
);
