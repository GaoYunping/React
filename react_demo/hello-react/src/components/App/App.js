import React from "react";
import logo from "./logo.svg";
import "./App.css";
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div  className="App">
        <div className="App-header">
          <img className="App-logo" src={logo} alt="" />
          <p className="App-title">www.baidu.com</p>
        </div>
        <p className="App-intro">www.baidu.com</p>
      </div>
    );
  }
}




export default App;











