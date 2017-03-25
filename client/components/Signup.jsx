const Signup = ({ signup, handleInputChange, state }) => (
  state.isAuthenticated ? (
    <Redirect to="/feed" />
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
            name="formUser"
            value={state.formUser}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Name"
            required />
          <br /> Username:
          <br />
          <input type="text"
            name="formUsername"
            value={state.formUsername}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Username"
            required />
          <br /> Password:
          <br />
          <input type="password"
            name="formPassword"
            value={state.formPassword}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Password"
            required />
          <br />
          <input className="btn btn-default" type="submit" value="Sign Up" />
          <br />
          <br />
          <Link to="/login">I already have an account</Link>
        </fieldset>
      </form>
    </div>
  )
);
