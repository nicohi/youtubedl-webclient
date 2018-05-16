import { combineReducers } from 'redux';
import songs from "./songs";


const ytdlbackend = combineReducers({
  songs,
})

export default ytdlbackend;