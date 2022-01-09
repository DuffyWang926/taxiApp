  
  import api from '../services/api'
  export const postProductList = (payload) => {
    return dispatch => {
      api.post('/productlist',payload).then((res) => {
        dispatch({
          type: 'PRODUCTLIST',
          payload: res
        })
      })
    }
  }
  
