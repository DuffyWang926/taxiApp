import { Component } from 'react'
import { Provider } from 'react-redux'
import './app.scss'
// import 'taro-ui/dist/style/index.scss'

import configStore from "./store";
debugger

const store = configStore();

// class App extends Component {

//   componentDidMount () {}

//   componentDidShow () {}

//   componentDidHide () {}

//   componentDidCatchError () {}

//   render () {
//     return this.props.children
//   }
// }
debugger

const App = ({ children }) =>{
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
  
}
debugger

export default App
