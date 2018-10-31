import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../styles/CreateArtist.css";

class CreateArtist extends Component {
  constructor(props) {
    super(props)

    this.state = { name: '', genre: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  validateForm() {
    const userInfo = JSON.parse(localStorage.getItem("user"))
    if (userInfo) {
      return this.state.name.length > 0 && this.state.genre.length > 0
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value  })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addArtist(this.state)
  }

  render() {
    return (
      <form className="container-create">
        <p className="text-form-create">
          <span className="error-msg">{this.props.errorMsg}</span> 
          <span className="success-msg">{this.props.msg}</span>
        </p>
        <FormGroup controlId="name">
          <ControlLabel className="label-text">Artista</ControlLabel>
          <FormControl type="text" value={this.state.name} onChange={this.handleChange} className="input-form" />
        </FormGroup>

        <FormGroup controlId="genre">
          <ControlLabel className="label-text"> Gênero </ControlLabel>
          <FormControl type="text" value={this.state.genre} onChange={this.handleChange} className="input-form" />
        </FormGroup>
        <div className="btn-group">
          <Button type="submit" onClick={this.handleSubmit} disabled={!this.validateForm()} className="btn-form"> Adicionar </Button>
        </div>
      </form>
    )
  }
}

export default CreateArtist