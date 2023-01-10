

  
  const INITIAL_STATE = {
    imgData:'',
    userAccount:{}
  }
  
  export default function home (state = INITIAL_STATE, action) {
    if(action.type ==  "CODEIMG"){
      const { data = {} } = action.payload
      const { imgData } = data
     

      return {
        ...state,
        imgData,
      }

    }else if(action.type == 'USERACCOUNT'){
      const { data = {} } = action.payload
      const { userAccount } = data
     

      return {
        ...state,
        userAccount,
      }

    }
    
    return state
    
  }
  