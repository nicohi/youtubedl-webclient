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
    text: ""
  }
  
  submitSong = (e) => {
    e.preventDefault();
    this.props.addSong(this.state.text);
    this.setState({text: ""});
  }

  render() {
    return (
      <div>
        <h2>Welcome to Youtube-dl!</h2>
        <hr />
        <h3>Add new note</h3>
        <form onSubmit={this.submitSong}>
          <input
            value={this.state.text}
            placeholder="Enter Song Link here..."
            onChange={(e) => this.setState({text: e.target.value})}
            required />
          <input type="submit" value="Download song" />
        </form>
        <h3>Songs</h3>
        <table>
          {this.props.songs.map((song, id) => (
            <tr key={`song_${id}`}>
              <td>{song.text}</td>
              <td><button>edit</button></td>
              <td><button onClick={() => this.props.deleteSong(id)}>delete</button></td>
            </tr>
          ))}
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