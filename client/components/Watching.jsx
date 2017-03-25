class Watching extends React.Component {
  constructor (props) {
    super (props)
    console.log(props);
  }

  render () {
    return <h5>{this.props.name}</h5>
  }
}

window.Watching = Watching;
