  
  import api from '../services/api'
  export const getCodeImg = (payload) => {
    return async dispatch => {
      let res = await api.get('/codeImg',payload)
      dispatch({
        type: 'CODEIMG',
        payload: res
      })
    }
  }

  
  
