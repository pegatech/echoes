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
      <div className='container-fluid'>
        <h1 className='followerTitle'>Your Follower Feed</h1>
      <div className='col-md-2'>
        <Search />
      </div>
      <table className='col-md-10'>
        <tbody >
        <tr className='row'>
          <h5 className='col-md-1'>Follower</h5>
          <th className='col-md-1'>
            <span className='glyphicon glyphicon-calendar'></span>
          </th>
          <th className='col-md-1'><h5>Album</h5></th>
          <th className='col-md-2'></th>
          <th className='impression col-md-4'><h5>Impression</h5></th>
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
      </table>
      </div>
    );
  }
}

window.FollowerList = FollowerList;