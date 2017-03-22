class FollowerList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.allFollower.map((follower) => {
          <Follower followerName={follower.follower_username}/>
        })}
      </div>
    );
  }
}

window.FollowerList = FollowerList;