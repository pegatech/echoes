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
      <div>
        <input type="text"
          name="userSearch"
          value={this.state.userSearch}
          onChange={this.handleInputChange} />

        <div className="">
          {this.state.results.map((result) => (
            <div className="result">
              <h1 key={result.id}>{result.user} - {result.username}</h1>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
