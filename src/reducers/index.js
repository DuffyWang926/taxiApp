import { combineReducers } from 'redux'
import home from './home'
import search from './search'
import mine from './mine'
import jingDong from './jingDong'


export default combineReducers({
  home,
  search,
  jingDong,
  mine
})