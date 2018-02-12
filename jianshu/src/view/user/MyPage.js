//用户页面
import React, { Component } from 'react';
import Aside from "components/myPage/Aside";
import AuthorInfo from "components/myPage/AuthorInfo";
let propTypes={

}
class MyPage extends Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div className="ui container grid">

        <div className="twelve wide column">
          <AuthorInfo/>
          <div className="ui secondary pointing menu">
            <span className="active item">
                {/* {previewsName} */}
            </span>
          </div>
        </div>
        <div className="four wide column">
            <Aside />
        </div>
      </div>
    );
  }
}
MyPage.propTypes=propTypes;
export default MyPage;