import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../styles/Home.css";

const BASE_URL = "https://peaceful-badlands-98440.herokuapp.com";

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      msg: "",
      user: [],
      errorMsg: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo)
    if (userInfo) {
      this.setState({ msg: `Olá ${userInfo[0]}, você está logado! =)`})
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleLogin = (event) => {
    event.preventDefault()

    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ 
        email: this.state.email, 
        password: this.state.password
      })
    }

    fetch(`${BASE_URL}/login`, options)
    .then(resp => resp.json())
    .then(data => { 
      if (data.email !== 0) {
      this.setState({ msg: `Olá ${data.email}, você está logado! =)`, 
        user: [data.email, data.password],
        errorMsg: "" 
      })
      localStorage.setItem("user", JSON.stringify(this.state.user))
      }
    })
    .catch((error) => {
      this.setState({ 
        errorMsg: "Ocorreu um problema no seu login, tente novamente ou entre em contato conosco =)",
        msg:""
      })
      console.log(error.message)
    })
    
    this.setState({email:"", password:""})
  }

  handleRegister = (event) => {
    event.preventDefault()

    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ 
        email: this.state.email, 
        password: this.state.password
      })
    }

    fetch(`${BASE_URL}/signup`, options)
      .then(resp => resp.json())
      .then(data => {
        if (data.email !== 0) {
          this.setState({
            msg: `Olá ${data.email}, você está logado! =)`,
            user: [data.email, data.password],
            errorMsg: ""
          })
          localStorage.setItem("user", JSON.stringify(this.state.user))
        }
      })
      .catch((error) => {
        this.setState({
          errorMsg: "Ocorreu um problema no seu cadastro, tente novamente ou entre em contato conosco =)",
          msg: ""
        })
        console.log(error.message)
      })

    this.setState({ email: "", password: "" })
  }

  render() {
    return (
      <section className="home"> 

        <div className="container text-box">
          <h1 className="text-title">Bem vindo !</h1>
          <p className="text-home"> A <span className="text-subtitle"> PedeToca </span> é uma API comunitária! </p> 
          <p className="text-home"> Ajude-nos a sermos o maior acervo de dados musicais do mundo! </p>
          <p className="text-home"> É muito fácil, basta fazer seu cadastro, ou efetuar um login e começar a cadastrar artistas! </p> 
        </div>

        <form className="container">
          <FormGroup controlId="email">
            <ControlLabel className="label-text">Email</ControlLabel>
            <FormControl type="email" value={this.state.email} onChange={this.handleChange} className="input-form"/>
          </FormGroup>
          <FormGroup controlId="password">
            <ControlLabel className="label-text"> Senha </ControlLabel>
            <FormControl type="password" value={this.state.password} onChange={this.handleChange} className="input-form"/>
          </FormGroup>

          <div className="btn-group">
            <Button type="submit" onClick={this.handleLogin} disabled={!this.validateForm()} className="btn-form"> Entrar </Button>       
              <p className="text-form"> ou </p>   
            <Button type="submit" onClick={this.handleRegister} disabled={!this.validateForm()} className="btn-form"> Cadastrar </Button>
          </div>
          <p className="text-user">
            <span className="success-msg">{this.state.msg}</span>
            <span className="error-msg">{this.state.errorMsg}</span>
          </p> 
        </form>

      </section>
    )
  }
}

export default Home