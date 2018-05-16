const initialState = [
    {text: "Write code!"}
  ];
  
  
  export default function songs(state=initialState, action) {
    let songList = state.slice();

    switch (action.type) {
  
      case 'ADD_SONG':
        return [...state, {text: action.text}];
  
      case 'DELETE_SONG':
        songList.splice(action.id, 1);
        return songList;
  
      default:
        return state;
    }
  }