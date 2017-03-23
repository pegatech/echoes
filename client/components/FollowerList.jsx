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
    console.log(nextProps);
  }

  render() {
    return (
      <div>
        <div className="container-fluid app">
          <div className="col-md-2">
            <h1>Follower Feed</h1>
              {this.state.allImpression.map((impression) => {
                return(
                  <Follower name={impression.name}
                            title={impression.title}
                            art={impression.art_url60}
                            date={impression.date.slice(0, 10)}
                            impression={impression.impression}
                            key={impression.id}/>
                )
              })}
          </div>
        </div>
      </div>
    );
  }
}

window.FollowerList = FollowerList;