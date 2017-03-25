class WatcherList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tbody className='container-fluid'>
        <tr className='row'>
          <th className='profile-list-title col-md-9'>
            Username
          </th>
        </tr>
        {this.props.allWatcher.map((watcher) => {
          return <Watcher WatcherName={watcher.username}
                          key={watcher.id} />
        })}
      </tbody>
    )
  }
}

window.WatcherList = WatcherList;