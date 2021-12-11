
  
  const INITIAL_STATE = {
    playListDetailInfo: {
      coverImgUrl: '',
      name: '',
      playCount: 0,
      tags: [],
      creator: {
        avatarUrl: '',
        nickname: ''
      },
      tracks: []
    },
    
  }
  
  export default function home (state = INITIAL_STATE, action) {
    switch (action.type) {
      case "GETSONGDETAIL":
        return {
          ...state
        }
      default:
        return state
    }
  }
  