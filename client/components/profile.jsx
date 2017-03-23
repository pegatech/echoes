class Profile extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      viewingEntry: '',
      allEntries: [],
      currentUser: '',
      following: ['larry', 'curly', 'mo', 'bob', 'window']
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
      <div className="container">
        <div className='col-md-8'>
          <h2 className="profile-header">Impressions:</h2>
          <table className="table-responsive table">
            <UserProfileList allEntries={this.state.allEntries} />
          </table>
        </div>
        <div className='col-md-4'>
          <h2 className="profile-header">Following:</h2>
          <table className="table-responsive table">
            <FollowerList allFollower={this.state.following} />
          </table>
        </div>
      </div>
    )
  }
}

window.Profile = Profile;


