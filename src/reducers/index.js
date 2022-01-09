import { combineReducers } from 'redux'
import home from './home'
import search from './search'
import productList from './productList'
import product from './product'


export default combineReducers({
  home,
  search,
  product,
  productList
})