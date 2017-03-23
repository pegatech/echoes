class TestApp extends React.Component {
  constructor (props) {
    super (props);
    // will hold state of all entries in database and current search values
    this.state = {
      allFollower: [],
      allFollowerImpression: []
    }
  }
  // when the component loads successfully
  componentWillMount () {
    // load all of the user's data
    this.getAllFollowerImpression();
  }

  // generates greeting in banner
  greetUser () {
    // if current user is identified
    if (this.state.currentUser) {
      // greet them by name
      return `Hello, ${this.state.currentUser}!`
    } else {
      // new users are greetedwith Hello
      return `Hello!`
    }
  }

  getAllFollowerImpression() {
    $.ajax({
      url: '/api/follower/',
      type: 'GET',
      success: (response) => {
        this.setState({
          allFollowerImpression: response
        });
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  // renders the app to the DOM
  render () {
    return (

      <div>
        <div className="container-fluid app">
          <header className="navbar">
            <div><h2 className="greeting">{this.greetUser()}</h2></div>
            <a href="/signout" className='navbar-right signout'>
              <button className="btn btn-default landing"><span>Sign Out</span></button>
            </a>
            <a href="/">
            <img className='navbar-center header logo' src="styles/logo.svg"></img>
            </a>
          </header>
          <div className="col-md-10">
            <FollowerList allFollowerImpression={this.state.allFollowerImpression}/>
          </div>
          </div>

      </div>
    )
  }
}

window.TestApp = TestApp;
