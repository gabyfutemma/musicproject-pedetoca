import React, {Component} from 'react';
import { Button } from "react-bootstrap";
import Card from "./Card.js";
import '../styles/ArtistCard.css';

function ArtistTrack(props) {
  return (
    <li key={props.id} className="music-list-item">
      {props.title}
    </li>
  )
}

class ArtistCard extends Component {
  constructor(props) {
    super(props)

    this.state = { tracks:[] }

    this.getTracks = this.getTracks.bind(this)
    this.handleDel = this.handleDel.bind(this)
  }

  getTracks(event) {
    event.preventDefault()
    const BASE_URL = "https://peaceful-badlands-98440.herokuapp.com";
    const options = {
      credentials: "include"
    }
    fetch(`${BASE_URL}/artists/${this.props.id}/tracks`, options)
      .then(resp => resp.json())
      .then(data => {
        if (data.length === 0) {
          this.setState({ tracks: [{ title: "Não há músicas cadastradas em nosso sistema" }] })        
        } else {
          this.setState({ tracks: data })
        }
      })
  }

  handleDel = (event) => {
    event.preventDefault()
    this.props.deleteArtist(this.props.id)
  }

  render() {
    return (
      <Card>
        <div className="artist-info">
          <h2 className="artist-title"> Artista: <span className="artist-name"> {this.props.name} </span> </h2>
          <h3 className="artist-subtitle"> Gênero: <span className="artist-genre"> {this.props.genre} </span> </h3>
        </div>
        <div className="artist-btn-group">
          <Button onClick={this.getTracks} className="btn-music"> Ver músicas </Button>
          <Button onClick={this.handleDel} className="btn-delete"> Deletar Artista</Button>
        </div> 

        <ul className="music-list">
         { this.state.tracks.map((track, index) => <ArtistTrack key={index} {...track}/> )}
        </ul>               
      </Card>
    )
  }    
}

export default ArtistCard