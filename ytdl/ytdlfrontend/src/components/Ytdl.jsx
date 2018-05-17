import React, { Component } from 'react';
import {connect} from 'react-redux';
import {songs} from "../actions";
import ReactLoading from "react-loading";
import MaterialIcon, {colorPallet} from 'material-icons-react';

function Spinner(props) {
  if (!props.loading) {
    return null;
  }
    return <ReactLoading type={props.type} color={props.color} height={40} width={40} />;
}

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
    addDuplicateSong: (obj) => {
      return dispatch(songs.addDuplicateSong(obj));
    }
  }
}

class Ytdl extends Component {
  state = {
    url: "",
    loading:false
  }

  resetForm = () => {
    this.setState({url: ""});
  }

  componentDidMount() {
    this.props.fetchSongs();
  }
  
  submitSong = (e) => {
    this.setState({loading:true});
    e.preventDefault();
    this.resetForm();
    var duplicate = false;
    this.props.songs.forEach(element => {
      if(element.url === this.state.url && !duplicate){
        var obj = {
          "filename": element.filename,
          "title": element.title,
          "url": element.url,
        }
        this.props.addDuplicateSong(obj).finally( () => {
          this.setState({loading:false});
        });
        duplicate = true;
      }
    });
    if(!duplicate){
      this.props.addSong(this.state.url).finally( () => {
        this.setState({loading:false});
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Youtube Downloader</h2>
        <hr />
        <h4>Add new Song</h4>
        <form onSubmit={this.submitSong}>
          <input
            value={this.state.url}
            placeholder="Enter Song Link here..."
            onChange={(e) => this.setState({url: e.target.value})}
            required />
          <input style={{display: 'inline-block'}} type="submit" value="Download song"/>
          <Spinner style={{display: 'inline-block'}} type="spin" color="#0000ff" loading={this.state.loading}/>
        </form>
        <h4>Songs</h4>
        <table style={{width:"100%"}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {this.props.songs.map((song, id) => (
              <tr key={`note_${song.id}`}>
                <td>{song.id}</td>
                <td>{song.title}</td>
                <td>{new Date(song.time).toLocaleString()}</td>
                {/* <td><button><MaterialIcon icon="delete" inactive/></button></td> */}
                <td><button onClick={() => this.props.deleteSong(id)}><MaterialIcon icon="delete" inactive/></button></td>
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
