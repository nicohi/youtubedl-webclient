export const fetchSongs = () => {
  return dispatch => {
    let headers = {"Content-Type": "application/json"};
    return fetch("/api/songs/", {headers, })
      .then(res => res.json())
      .then(songs => {
        return dispatch({
          type: 'FETCH_SONGS',
          songs
        })
      })
  }
}

export const addSong = url => {
  return dispatch => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({url,});
    return fetch("/api/dlsong", {headers, method: "POST", body})
      .then(res => res.json())
      .then(song => {
        return dispatch({
          type: 'ADD_SONG',
          song
        })
      })  
  }
}

export const addDuplicateSong = obj => {
  return dispatch => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({"url": obj.url, "title": obj.title, "filename":obj.filename});
    return fetch("/api/songs/", {headers, method: "POST", body})
      .then(res => res.json())
      .then(song => {
        return dispatch({
          type: 'ADD_DUPLICATE_SONG',
          song
        })
      })  
  }
}

export const addDuplicateSongToMpd = obj => {
  return dispatch => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({"filename":obj.filename});
    return fetch("/api/mpd_queue/", {headers, method: "POST", body})
      .then(res => res.json())
      .then(song => {
        return dispatch({
          type: 'ADD_DUPLICATE_SONG_TO_MPD',
          song
        })
      })  
  }
}

export const deleteSong = index => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let songId = getState().songs[index].id;

    return fetch(`/api/songs/${songId}/`, {headers, method: "DELETE"})
      .then(res => {
        if (res.ok) {
          return dispatch({
            type: 'DELETE_SONG',
            index
          })
        }
      })
  }
}
