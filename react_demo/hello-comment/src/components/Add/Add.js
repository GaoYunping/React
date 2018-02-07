import React, { Component } from "react";

export default class Add extends Component {
  add = () => {
    let userName = this.refs.userName.value;
    let userContent = this.refs.userContent.value;
    if (!userName || !userContent) {
      alert("输入内容必须完整");
      return;
    }
    let obj = { userName, userContent };
    this.props.AddData(obj);
    this.refs.userContent.value = "";
    this.refs.userName.value = "";
  };
  render() {
    let { add } = this;
    return (
      <div className="col-md-4">
        <form className="form-horizontal">
          <div className="form-group">
            <label>用户名</label>
            <input
              ref="userName"
              type="text"
              className="form-control"
              placeholder="用户名"
            />
          </div>
          <div className="form-group">
            <label>评论内容</label>
            <textarea
              ref="userContent"
              className="form-control"
              rows="6"
              placeholder="评论内容"
            />
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button
                onClick={add}
                type="button"
                className="btn btn-default pull-right"
              >
                提交
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
