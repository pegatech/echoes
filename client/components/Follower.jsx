class Follower extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.followerName}
      </div>
    )
  }
}