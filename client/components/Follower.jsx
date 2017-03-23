class Follower extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h4>{this.props.username}</h4>
        <img src={this.props.art}/>
        <div>{this.props.name}</div>
        <div>{this.props.title}</div>
        <div>{this.props.impression}</div>
        <div>{this.props.date}</div>
      </div>
    )
  }
}

window.Follower = Follower;
