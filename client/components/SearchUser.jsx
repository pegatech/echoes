class SearchUser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userSearch: '',
      results: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value }, this.search);
  }

  search() {
    if (this.state.userSearch) {

      var query = $.param({ search: this.state.userSearch });

      $.ajax({
        method: 'GET',
        url: '/api/users/?' + query,
        success: (data) => {
          this.setState({
            results: data
          });
        }
      });
    } else {
      this.setState({ results: [] });
    }
  }

  render() {
    return (
      <div className="search-user">
        <div>
          <input type="text"
            name="userSearch"
            className="user-search-input form-control"
            value={this.state.userSearch}
            placeholder="Search By Username"
            onChange={this.handleInputChange} />

          {this.state.results.length !== 0 ? (
            <div className="search-results">
              {this.state.results.map((result) => (
                <div className="result" key={result.id}>
                  <Link to={'/profile/' + result.username}>
                    <div className="row">
                      <div className="col-xs-5"><h1 style={{'font-weight': 'bold'}}>{result.username}</h1></div>
                      <div className="col-xs-7"><h1 style={{'text-align': 'right'}}>{result.user}</h1></div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (null)}
        </div>
      </div>
    );
  }
}
