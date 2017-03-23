class FollowerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allImpression: this.props.allFollowerImpression
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allImpression: nextProps.allFollowerImpression
    })
  }

  render() {
    return (
      <div>
        <div className="container-fluid app">
          <div className="col-md-2">
            <h1>Follower Feed</h1>
              {this.state.allImpression.map((impression) => {
                return(
                  impression.map((follow) => {
                    return (
                      <Follower impression={follow.impression}
                                art={follow.art_url60}
                                name={follow.name}
                                title={follow.title}
                                date={follow.date.slice(0, 10)}
                                username={follow.username}
                                key={follow.id}/>
                    )
                  })
                )
              })}
          </div>
        </div>
      </div>
    );
  }
}

window.FollowerList = FollowerList;