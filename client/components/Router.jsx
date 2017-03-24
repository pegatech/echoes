class Router extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      waitForAuth: true,
      isAuthenticated: false,
      user: null,
      formUsername: '',
      formPassword: '',
      formUser: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/api/users/?current=true',
      success: (data) => {
        this.setState({
          isAuthenticated: true,
          waitForAuth: false,
          user: data
        });
      },
      error: () => {
        this.setState({
          waitForAuth: false
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
        username: this.state.formUsername,
        password: this.state.formPassword
      },
      success: (data) => {
        this.setState({
          user: data,
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
        user: this.state.formUser,
        username: this.state.formUsername,
        password: this.state.formPassword
      },
      success: (data) => {
        this.setState({
          user: data,
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
          user: null,
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
            {this.state.isAuthenticated ? (
              <div>
                <a href="#" onClick={this.logout} className='btn btn-default'>Logout</a>
                <Link to="/search" className="btn btn-default" >User Search</Link>
                <Link className="btn btn-default" to="/profile">Profile</Link>
              </div>
            ) : null}
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
          )}/>

          <Route path="/dashboard" render={props => (
            this.state.isAuthenticated ? (
              <App />
            ) : (
              !this.state.waitForAuth ? <Redirect to="/login" /> : null
            )
          )}/>

          <Route path="/search" render={props => (
            this.state.isAuthenticated ? (
              <SearchUser />
            ) : (
              !this.state.waitForAuth ? <Redirect to="/login" /> : null
            )
          )}/>

          <Route path="/profile/:username?" render={props => (
            this.state.isAuthenticated ? (
              <Profile user={this.state.user} target={props.match.params.username}/>
            ) : (
              !this.state.waitForAuth ? <Redirect to="/login" /> : null
            )
          )}/>

          <Route exact path="/" component={Landing} />

        </div>
      </BrowserRouter>
    );
  }
}
