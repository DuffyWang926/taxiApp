
  
  const INITIAL_STATE = {
    name: '12s3',
  }
  
  export default function home (state = INITIAL_STATE, action) {
    switch (action.type) {
      case "HOMEDETAIL":
        const { name } = action.payload
        return {
          ...state,
          name
        }
      default:
        return state
    }
  }
  