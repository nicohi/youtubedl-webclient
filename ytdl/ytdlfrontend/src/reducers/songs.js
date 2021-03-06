const initialState = [];
  
  
  export default function songs(state=initialState, action) {
    let songList = state.slice();


    switch (action.type) {
  
      case 'ADD_SONG':
        return [action.song,...state];

      case 'ADD_DUPLICATE_SONG':
        return [action.song,...state];

      case 'ADD_DUPLICATE_SONG_TO_MPD':
        return [...state];

      case 'DELETE_SONG':
        songList.splice(action.index, 1);
        return songList;
      case 'FETCH_SONGS':
        return [...action.songs];
  
      default:
        return state;
    }
  }
