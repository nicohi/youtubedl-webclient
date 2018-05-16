import React, { Component } from 'react';
import {connect} from 'react-redux';
import {songs} from "../actions";

const mapDispatchToProps = dispatch => {
  return {
    addSong: (text) => {
      dispatch(songs.addSong(text));
    },
    deleteSong: (id) => {
      dispatch(songs.deleteSong(id));
    },
  }
}

class Ytdl extends Component {
  state = {
    url: ""
  }

  resetForm = () => {
    this.setState({url: ""});
  }

  componentDidMount() {
    this.props.fetchSongs();
  }
  
  submitSong = (e) => {
    e.preventDefault();
    this.props.addSong(this.state.url).then(this.resetForm);
    this.setState({url: ""});
  }

  render() {
    return (
      <div>
        <h2>Youtube Downloader</h2>
        <hr />
        <h4>Add new Song</h4>
        <form onSubmit={this.submitSong}>
          <input
            value={this.state.text}
            placeholder="Enter Song Link here..."
            onChange={(e) => this.setState({text: e.target.value})}
            required />
          <input type="submit" value="Download song" />
        </form>
        <h4>Songs</h4>
        <table style={{width:"100%"}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
          {this.props.songs.map((song, id) => (
              <tr key={`note_${song.id}`}>
                <td>{song.id}</td>
                <td>{song.title}</td>
                <td><button onClick={() => this.props.deleteSong(id)}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songs,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ytdl);