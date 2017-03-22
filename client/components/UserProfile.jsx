class UserProfile extends React.Component {
  constructor (props) {
    super (props)
    }

  render () {
    return <div> {this.props.impression} </div>;
  }
}

window.UserProfile = UserProfile;