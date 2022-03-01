  
  import api from '../services/api'
  export const postLogin = (payload) => {
    return async dispatch => {
      let res = await api.post('/login',payload)
      dispatch({
        type: 'LOGIN',
        payload: res
      })
      
    }
  }

  export const changeHomeData = (payload) => {
    return {
      type: 'CHANGEHOMEDATA',
      payload
    }
  }
  
