class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      allEntries: [],
      watching: [],
      currentUser: props.target || props.user.username,
      isLoggedInUser: props.target === props.user.username || !props.target,
      isFollowing: props.user.followers.includes(props.target)
    };

    this.getEntries = this.getEntries.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      currentUser: newProps.target || newProps.user.username,
      isLoggedInUser: newProps.target === newProps.user.username || !newProps.target,
      isFollowing: newProps.user.followers.includes(newProps.target)
    }, this.getEntries);
  }

  componentDidMount() {
    this.getEntries();
  }

  getEntries() {

    $.ajax({
      method: 'GET',
      url: '/querydb/?username=' + this.state.currentUser,
      success: (data) => {
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

  follow() {
    var target = this.props.target;

    $.ajax({
      method: 'POST',
      url: '/api/follower/',
      data: {
        follower: target
      },
      success: () => {
        console.log('Follower Added');
        this.props.addFollower(target);
      }
    });
  }

  unfollow() {
    var target = this.props.target;
    $.ajax({
      method: 'POST',
      url: '/api/follower/' + target,
      success: () => {
        console.log('Follower Removed');
        this.props.removeFollower(target);
      }
    });
  }

  render () {
    return (
      <div className="container">
        <div className="profile-top">

          <h1 className="profile-title">{this.state.isLoggedInUser ? 'Your' : this.state.currentUser + '\'s'} Profile</h1>

          {this.state.isFollowing && !this.state.isLoggedInUser ? (
            <button className="unfollow btn btn-danger" onClick={this.unfollow}>Unfollow</button>
          ) : (null) }

          {!this.state.isFollowing && !this.state.isLoggedInUser ? (
            <button className="follow btn btn-warning" onClick={this.follow}>Follow</button>
          ) : (null) }

        </div>

        <div className="row">
          <div className='col-md-8 profile-impressions'>
            <h2 className="profile-header">Impressions:</h2>
            <div className="round">
              <UserProfileList allEntries={this.state.allEntries} />
            </div>
          </div>
          <div className='col-md-4'>
            <h2 className="profile-header">Following:</h2>
              <div className="round">
                <WatcherList allWatcher={this.state.watching} />
              </div>
          </div>
        </div>
      </div>
    );

  }
}
