const Login = () => (
  <div className="form-signin">
    <form action="/signin" method="POST">
      <br />
      <h1 className='signin'>Sign In</h1>
      <br />
      <fieldset>
        Username:
        <br />
        <input type="text" className="form-control" name="username" placeholder="Username" required />
        <br />
        Password:
        <br />
        <input type="password" className="form-control" name="password" placeholder="Password" required />
        <br />
        <input className="btn btn-default" type="submit" value="Sign In" />
        <br />
        <br />
        <a href="/signup">Create an account</a>
      </fieldset>
    </form>
  </div>
);
