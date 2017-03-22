class UserProfile extends React.Component {
  constructor (props) {
    super (props)
    }

  render () {
    return (
      <div>
        <div className="row">
          <div className="col-xs-3">
            <img src={this.props.art_url60}></img>
          </div>
          <div className="col-xs-4">
            <p>{this.props.name}</p>
          </div>
          <div className="col-xs-5">
            <div>{this.props.impression}</div>
          </div>
        </div>
      </div>
    )
  }
}

window.UserProfile = UserProfile;