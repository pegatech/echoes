class UserProfileList extends React.Component {
  constructor (props) {
    super (props)
    }

  render () {
    return (
      <tbody className='container-fluid entryList'>
        <tr className='row'>
          <th className='col-md-2'>
            Album
          </th>
          <th className="col-md-5">
            Artist
          </th>
          <th className="col-md-5">
            Impressions
          </th>
        </tr>
        {this.props.allEntries.map( (entry) => {
          return <UserProfile art_url60={this.props.art_url60} 
                  name={this.props.name}
                  impression={this.props.impression} />
        })}
      </tbody>
    )
  }
}

window.UserProfileList = UserProfileList;