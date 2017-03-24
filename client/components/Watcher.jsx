class Watcher extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr className="entry row">
        <td className="col-md-9">
          {this.props.WatcherName}
        </td>
        <td className="col-md-3">
          <button className='remove btn btn-default'>
            unfollow
          </button>
        </td>
      </tr>
    )
  }
}