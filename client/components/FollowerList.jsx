class FollowerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allImpression: this.props.allFollowerImpression
    }
  }

  componentWillReceiveProps(nextProps) {
    var merged = [].concat.apply([], nextProps.allFollowerImpression);

    var sorted = merged.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    this.setState({
      allImpression: sorted
    })
  }

  render() {
    return (
      <div>
      <h1>Your Follower Feed</h1>
      <tbody className='container-fluid col-md-10'>
      <tr className='row'>
        <th className='col-md-2'><h5>Follower</h5></th>
        <th className='col-md-2'>
          <span className='glyphicon glyphicon-calendar'></span>
        </th>
        <th className='col-md-4'><h5>Album</h5></th>
        <th className='impression col-md-3'><h5>Impression</h5></th>
        <th className='rating col-md-1'><h5>Rating</h5></th>
      </tr>
      {this.state.allImpression.map((impression) => {
        return(
              <Follower impression={impression.impression}
                        art={impression.art_url60}
                        name={impression.name}
                        title={impression.title}
                        date={impression.date}
                        username={impression.username}
                        genre={impression.genre}
                        year={impression.year}
                        rating={impression.rating}
                        key={impression.id}/>
        )
      })}
      </tbody>
      </div>
    );
  }
}

window.FollowerList = FollowerList;