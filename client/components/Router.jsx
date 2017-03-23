class Router extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      username: '',
      password: '',
      user: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/api/users',
      success: (data, statusText, xhr) => {
        this.setState({
          isAuthenticated: true
        });
      }
    });
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  login(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/users/login',
      data: {
        username: this.state.username,
        password: this.state.password
      },
      success: (data, statusText, xhr) => {
        this.setState({
          isAuthenticated: true
        });
      }
    });
  }

  signup(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/users/signup',
      data: {
        user: this.state.user,
        username: this.state.username,
        password: this.state.password
      },
      success: function() {
        this.setState({
          isAuthenticated: true
        });
      }
    });
  }

  logout(e) {
    e.preventDefault();
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
            <img src="/styles/logo.svg"></img>
          </div>

          <Route path="/login" render={props => (
            <Login login={this.login}
              handleInputChange={this.handleInputChange}
              state={this.state}/>
          )}/>

          <Route path="/signup" render={props => (
            <Signup signup={this.signup}
              handleInputChange={this.handleInputChange}
              state={this.state} />
          )} />

          <Route path="/dashboard" render={props => (
            this.state.isAuthenticated ? (
              <App logout={this.logout} />
            ) : (
              <Redirect to="/" />
            )
          )}/>

          <Route exact path="/" component={Landing} />

        </div>
      </BrowserRouter>
    );
  }
}
