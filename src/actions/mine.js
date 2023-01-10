  
import api from '../services/api'
export const getCodeImg = (payload) => {
  return async dispatch => {
    let res = await api.post('/codeImg',payload)
    dispatch({
      type: 'CODEIMG',
      payload: res
    })
  }
}

export const getSearchData = (payload) => {
  return async dispatch => {
    await api.get('/searchData',payload)
  }
}

export const getUserAccount = (payload) => {
  return async dispatch => {
    let res = await api.post('/userAccount',payload)
    dispatch({
      type: 'USERACCOUNT',
      payload: res
    })
  }
}


  
  
  
