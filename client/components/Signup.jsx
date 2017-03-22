const Signup = () => (
  <div className="form-signup">
    <form action="/signup" method="post">
      <br />
      <h1 className='signup'>Create a new account</h1>
      <br />
      <fieldset>
        First name:
        <br />
        <input type="text" className="form-control" name="user" placeholder="Name" required />
        <br /> Username:
        <br />
        <input type="text" className="form-control" name="username" placeholder="Username" required />
        <br /> Password:
        <br />
        <input type="password" className="form-control" name="password" placeholder="Password" required />
        <br />
        <input className="btn btn-default" type="submit" value="Sign Up" />
        <br />
        <br />
        <a href="/signin">I already have an account</a>
      </fieldset>
    </form>
  </div>
);
