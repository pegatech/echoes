const Login = ({state, login, handleInputChange}) => (
  state.isAuthenticated ? (
    <Redirect to="/feed" />
  ) : (
    <div className="form-signin">
      <form onSubmit={login}>
        <br />
        <h1 className='signin'>Sign In</h1>
        <br />
        <fieldset>
          Username:
          <br />
          <input type="text"
                 name="formUsername"
                 value={state.formUsername}
                 onChange={handleInputChange}
                 className="form-control"
                 placeholder="Username"
                 required />
          <br />
          Password:
          <br />
          <input type="password"
                 name="formPassword"
                 value={state.formPassword}
                 onChange={handleInputChange}
                 className="form-control"
                 placeholder="Password"
                 required />
          <br />
          <input className="btn btn-default" type="submit" value="Sign In" />
          <br />
          <br />
          <Link to="/signup">Create an account</Link>
        </fieldset>
      </form>
    </div>
  )
);
