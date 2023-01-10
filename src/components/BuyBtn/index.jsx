import { Component } from 'react'
import { View } from "@tarojs/components";
import "./index.scss";
import { connect } from "../../utils/connect";
import {
  postLogin,
  recordTime
} from "../../actions/home";
const mapStateToProps = (state)=>{
  const { home } = state
  const { userId, openid } = home
  return {
    userId,
    openid
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    postLogin:(payload)=>{
      dispatch(postLogin(payload));
    },
    recordTime:(payload)=>{
      dispatch(recordTime(payload));
    },
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {
  onRedClick = () =>{
    const { openid} = this.props
    const { url } = this.props.data
    debugger
    let clickTime = new Date().getTime() + ''
    this.props.recordTime({openid, clickTime})
    window.location.href = url
  }
  render(){
    const { msg } = this.props.data
    return (
      <View>
        <View className='buyBtn' onClick={() => this.onRedClick()}>
          {msg}
        </View>
      </View>
    )
  }
}

