import React, { Component } from 'react';
import {connect} from 'react-redux';
import {songs} from "../actions";

const mapDispatchToProps = dispatch => {
  return {
    addSong: (url) => {
      return dispatch(songs.addSong(url));
    },
    deleteSong: (id) => {
      dispatch(songs.deleteSong(id));
    },
    fetchSongs: () => {
      dispatch(songs.fetchSongs());
    },
  }
}

class Ytdl extends Component {
  state = {
    url: ""
  }

  componentDidMount() {
    this.props.fetchSongs();
  }
  
  submitSong = (e) => {
    e.preventDefault();
    this.props.addSong(this.state.url);
    this.setState({url: ""});
  }

  render() {
    return (
      <div>
        <h2>Welcome to Youtube-dl!</h2>
        <hr />
        <h3>Add new Song</h3>
        <form onSubmit={this.submitSong}>
          <input
            value={this.state.url}
            placeholder="Enter Song Link here..."
            onChange={(e) => this.setState({url: e.target.value})}
            required />
          <input type="submit" value="Download song"/>
        </form>
        <h3>Songs</h3>
        <table style={{width:"100%"}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {this.props.songs.map((song, id) => (
              <tr key={`note_${song.id}`}>
                <td>{song.id}</td>
                <td>{song.title}</td>
                <td>{song.state}</td>
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