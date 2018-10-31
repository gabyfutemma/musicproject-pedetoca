import React, { Component } from 'react';
import ArtistCard from "./ArtistCard.js";
import CreateArtist from "./CreateArtist";
import "../styles/Artists.css";

const BASE_URL = "https://peaceful-badlands-98440.herokuapp.com";

class Artists extends Component {
  constructor(props) {
    super(props)

    this.state = {
        artists: [],
        errorMsg: "",
        msg: ""
    }
  }

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (userInfo) {
      const options = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: userInfo[0], password: userInfo[1] })
      }

      fetch(`${BASE_URL}/login`, options)
      .then(resp => {
        const options = {
          credentials: "include"
        }
        fetch(`${BASE_URL}/artists`, options)
        .then(resp => resp.json())
        .then(data => {
          this.setState({ 
            artists: data, 
            msg: "Adicione artistas em nossa lista!",
            errorMsg: ""
           })
        })
      })
    } else {
      this.setState({
        errorMsg: "Você não está logado",
        msg: ""
      })
    }
  }

  addArtist = (artist) => {
    let artists = [...this.state.artists, artist]

    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: artist.name, genre: artist.genre })
    }

    fetch(`${BASE_URL}/artists`, options)
      .then(resp => resp.json())
      this.setState({ artists: artists })
  }

  deleteArtist = (id) => {
    let artists = this.state.artists.filter((artistId) => artistId.id !== id)
    this.setState({ artists: artists })

    const options = {
      method: "delete",
      credentials: "include",
    }

    fetch(`${BASE_URL}/artists/${id}`, options)
  }

  render() {
    return (
      <section className="artists"> 
        <CreateArtist addArtist={this.addArtist} errorMsg={this.state.errorMsg} msg={this.state.msg}/>
        <div className="artists-list">
          {this.state.artists.map((artist, index) => <ArtistCard key={index} {...artist} deleteArtist={this.deleteArtist} />)}
        </div>
      </section>
    )
  }

}

export default Artists