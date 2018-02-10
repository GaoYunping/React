import S from "./style.scss";

import React, { Component } from 'react';
export default class Aside extends Component {
  constructor(props){
    super(props)

  }
  render() {
    return (
      <div className={S.aside}>
        <div className="introduce">
            <div className="title">
                个人介绍
                <div className="ui divider hidden"></div>

                <p>个人介绍的信息</p>

            </div>
        </div>
        <div className="ui divider hidden"></div>

          <div className={S.volume}>
              <div className={S.title}>
                  我的文集
              </div>
              <div className="ui list">
                  
              </div>
          </div>
      </div>
    )
  }
}

