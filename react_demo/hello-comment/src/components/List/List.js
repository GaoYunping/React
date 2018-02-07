import React, { Component } from "react";
import Item from "../Item/Item";
class List extends Component {
  render() {
    let { userData, del } = this.props;
    //判断数据是否大于0
    let display = userData.length > 0 ? "none" : "block";
    return (
      <div className="col-md-8">
        <h3 className="reply">评论回复：</h3>
        <h2 style={{ display }}>暂无评论，点击左侧添加评论！！！</h2>
        <ul className="list-group">
          {userData.map((item, index) => (
            <Item key={index} data={item} index={index} del={del} />
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
