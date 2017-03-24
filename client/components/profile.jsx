class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      allEntries: [],
      watching: [],
      currentUser: props.target ? props.target : props.user.username,
      isLoggedInUser: !props.target
    };
  }

  componentDidMount() {

    $.ajax({
      method: 'GET',
      url: '/querydb/?username=' + this.state.currentUser,
      success: (data) => {

        console.log(data);
        this.setState({
          allEntries: data
        });
      }
    });

    $.ajax({
      method: 'GET',
      url: '/api/follower/' + this.state.currentUser,
      success: (data) => {
        this.setState({
          watching: data
        });
      }
    });
  }


  greetUser () {
    // if current user is identified
    if (this.state.currentUser) {
      // greet them by name
      return `Hello, ${this.state.currentUser}!`;
    } else {
      // new users are greetedwith Hello
      return 'Hello!';
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
            <WatcherList allWatcher={this.state.watching} />
          </table>
        </div>
      </div>
    );

  }
}
