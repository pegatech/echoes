class Router extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      username: '',
      password: '',
      user: ''
    };
  }

  login(username, password) {
    $.ajax({
      method: 'POST',
      url: '/api/users/login',
      data: {
        username: username,
        password: password
      },
      success: (data, statusText, xhr) => {
        this.setState({
          isAuthenticated: true
        });
      }
    });
  }

  signup(user, username, password) {
    $.ajax({
      method: 'POST',
      url: '/api/users/signup',
      data: {
        user: user,
        username: username,
        password: password
      },
      success: function() {
        this.setState({
          isAuthenticated: true
        });
      }
    });
  }

  logout() {
    $.ajax({
      method: 'POST',
      url: '/api/users/logout',
      success: () => {
        this.setState({
          isAuthenticated: false
        });
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="router-nav">
            <img src="styles/logo.svg"></img>
          </div>

          <Route path="/router" component={Landing} />
          <Route path="/router/login" component={Login} />
          <Route path="/router/signup" component={Signup} />
          <PrivateRoute path="/router/dashboard" component={App} />
        </div>
      </BrowserRouter>
    );
  }
}

const PrivateRoute = ({ component, path }) => (
  <Route path={path} render={props => (
    auth.isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to="/router/login" />
    )
  )}/>
);
