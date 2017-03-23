class UserProfileList extends React.Component {
  constructor (props) {
    super (props)
    }

  render () {
    return (
      <tbody className='container-fluid'>
        <tr className='row'>
          <th className='profile-list-title profile-list-left col-md-2'>
            Album
          </th>
          <th className="profile-list-title profile-list-left col-md-5">
            Artist
          </th>
          <th className="profile-list-title profile-list-left col-md-5">
            Impressions
          </th>
        </tr>
        {this.props.allEntries.map( (entry) => {
          return <UserProfile art_url60={entry.art_url60} 
                  name={entry.name}
                  impression={entry.impression} />
        })}
      </tbody>
    )
  }
}

window.UserProfileList = UserProfileList;