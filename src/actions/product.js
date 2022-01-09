  
  import api from '../services/api'
  export const postProduct = (payload) => {
    return dispatch => {
      api.post('/productId',payload).then((res) => {
        dispatch({
          type: 'PRODUCT',
          payload: res
        })
      })
    }
  }
  
