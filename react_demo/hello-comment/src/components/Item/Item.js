import React, { Component } from "react";
import PubSub from "pubsub-js";
class Item extends Component {
 
 //删除数据
  delData = index => {
    if (window.confirm(`你确定要删除${this.props.data.userName}的评论吗？`)) {
      //通过订阅发布模式删除
      PubSub.publish('delete', this.props.index)
      //组件传递方式
      // this.props.del(this.props.index);
    }
  };

  render() {
    let { data } = this.props;
    let { delData } = this;
    return (
      <li className="list-group-item">
        <div className="handle">
          <a href="javascript:;" onClick={delData}>
            删除
          </a>
        </div>
        <p className="user">
          <span>{data.userName}</span>
          <span> 说:</span>
        </p>
        <p className="centence">{data.userContent}!</p>
      </li>
    );
  }
}

export default Item;
