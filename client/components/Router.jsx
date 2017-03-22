class Router extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="router-nav">
            <img src="styles/logo.svg"></img>
          </div>

          <Route exact path="/router" component={Landing} />
          <Route path="/router/login" component={Login} />
          <Route path="/router/signup" component={Signup} />
        </div>
      </BrowserRouter>
    );
  }
}
