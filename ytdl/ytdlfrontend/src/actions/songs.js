export const addSong = text => {
  return {
    type: 'ADD_SONG',
    text
  }
}
  
export const deleteSong = id => {
  return {
    type: 'DELETE_SONG',
    id
  }
}