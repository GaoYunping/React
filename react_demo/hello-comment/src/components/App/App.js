import React, { Component } from "react";
import PubSub from "pubsub-js";
import Add from "../Add/Add";
import List from "../List/List";

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: [
        {
          userName: "555",
          userContent: "开发计划是客服号"
        },
        {
          userName: "666",
          userContent: "低功耗的符合规定"
        }
      ]
    }
  }
  //组件挂载之前订阅
  componentWillMount(){
    PubSub.subscribe('delete', (data)=>{ 
      let { userData } = this.state;
      userData.splice(data, 1);
      this.setState({ userData });
    });
  }
  AddData = obj => {
    let { userData } = this.state;
    userData.unshift(obj);
    this.setState({ userData });
  }
  //组件传递方式；
  // del = index => {
  //   let { userData } = this.state;
  //   userData.splice(index, 1);
  //   this.setState({ userData });
  // };
  render() {
    let { userData } = this.state;
    let { AddData, del } = this;

    return (
      <div>
        <header className="site-header jumbotron">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h1>请发表对React的评论</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <Add AddData={AddData} />
          <List userData={userData} del={del} />
        </div>
      </div>
    );
  }
}
