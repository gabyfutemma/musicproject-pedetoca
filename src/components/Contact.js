import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../styles/Contact.css";

class Contact extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      email: "",
      msg: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleReset = (event) => {
    event.preventDefault()
    this.setState({ name:"", email:"", msg:"" })
  }

  validateForm() {
    return this.state.name.length > 0 && this.state.email.length > 0 && this.state.msg.length > 0;
  }

  render() {
    return (
      <section className="contact">

        <div className="container text-box">
          <h1 className="text-title">Fale Conosco !</h1>
          <p className="text-home"> Desculpe o transtorno, no momento nosso formulário está em construção, por favor entre em contato no email <span className="text-subtitle">contato@pedetoca.com</span> </p>
        </div>

        <form className="container">
          <FormGroup controlId="name">
            <ControlLabel className="label-text">Nome</ControlLabel>
            <FormControl type="text" value={this.state.name} onChange={this.handleChange} className="input-form" />
          </FormGroup>
          <FormGroup controlId="email">
            <ControlLabel className="label-text"> Email </ControlLabel>
            <FormControl type="email" value={this.state.email} onChange={this.handleChange} className="input-form" />
          </FormGroup>
          <FormGroup controlId="msg">
            <ControlLabel className="label-text"> Mensagem </ControlLabel>
            <FormControl componentClass="textarea" value={this.state.msg} onChange={this.handleChange} className="input-form" />
          </FormGroup>

          <div className="contact-btn-group">
            <Button type="submit" disabled={!this.validateForm()} className="btn-form"> Enviar </Button>
            <Button type="reset" onClick={this.handleReset} disabled={!this.validateForm()} className="btn-form"> Limpar </Button>   
          </div>    
        </form>

      </section>
    )
  }
  
}

export default Contact