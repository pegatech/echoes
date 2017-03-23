class Profile extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      viewingEntry: '',
      allEntries: [],
      currentUser: '',
      watched: ['larry', 'curly', 'mo', 'bob', 'window']
  }
}

  componentWillMount() {
    this.getUserEntries();
  }

  getUserEntries () {
    $.ajax({
      url: '/querydb',
      type: 'GET',
      success: (response) => {
        // sets state of all entries
        // sets current user name
        if (response.length) {
          this.setState({
            allEntries: response,
            currentUser: response[0].user,
          })
        }
      },
      error: function (error) {
        console.log(error);
        throw error;
      }
    });
  }

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


  render () {
    return (
    <div className="profile">
        <div className="container-fluid app">
          <header className="navbar">
            <div><h2 className="greeting">{this.greetUser()}</h2></div>
            <a href="/signout" className='navbar-right signout'>
              <button className="btn btn-default landing"><span>Sign Out</span></button>
            </a>
            <img className='navbar-center header logo' src="styles/logo.svg"></img>
            <h1 className="profile rating "> Profile: {this.state.currentUser} </h1>
          </header>   
      
      <div className="container">
        <div className='col-xs-8'>
          <h2 className="rating">Impressions:</h2>
          {this.state.allEntries.map((elt) => {
            return  <UserProfile art_url60={elt.art_url60} name={elt.name} impression={elt.impression}/>
          })}
        </div>
        <div className='col-xs-4'>
          <h2 className="rating">Watching:</h2>
          {this.state.watched.map( (username) => {
            return <Watching name={username} />
          })}
        </div>
      </div>
    </div>
    </div>

    )
  }
}

window.Profile = Profile;


