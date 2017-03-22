class ImpressBox extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      rating: '',
      impression: ''
    }
  };

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <form onChange={this.props.change(this.state.rating, this.state.impression)}>
        <textarea className="form-control"
                  id="impression"
                  name="impression"
                  cols="25"
                  rows="4"
                  onChange={this.handleInputChange.bind(this)}
                  value={this.state.impression}
                  placeholder="Write your impression here...">
        </textarea>
        <select className='form-control' name='rating' id='rating' value={this.state.rating} onChange={this.handleInputChange.bind(this)}>
          <option value={null}>Rating</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </form>
)
  }
}

window.ImpressBox = ImpressBox;