//导航
import React, { Component } from 'react';

import {Link , NavLink} from "react-router-dom";
import PropTypes from 'prop-types'
import S from "./style.scss"

let propTypes={
  myInfo:PT.object,
  logOut:PT.func
}
export default class Nav extends Component {
 constructor(props){
   super(props);
 }
  render() {
    let {myInfo,logOut}=this.props;
    let userLink=null;
    if(myInfo){
      userLink=(
        <NavLink to="/my_page"
         className={`${S.avatar} item`}
         activeClassName="active" >
         <img src={myInfo.avatar} alt="" className="ui image avatar"/>
          <div className={S.dropDown}>
              <p onClick={ 
                  (ev)=>{
                    ev.stopPropagation();
                    ev.preventDefault();
                    logOut();
                  }} >注销</p>
          </div>
      
         </NavLink>
      )

    }else{
      userLink=[(
        <NavLink to="/sign_in" className={` item`}
            activeClassName="active"
            key="1"
            >登陆</NavLink>
      ),(
        <NavLink to="/sign_up" className={` item`}
          activeClassName="active"
          key="2"
          >注册</NavLink>
      )]
    }

    return (
      <div className={`ui fixed secondary pointing menu ${S.nav}`}>
        <div className=" ui container">
          <Link to="/" className={`header item`}
          
          >Nodes</Link>
          <NavLink exact to="/" className={` item`}
          activeClassName="active"
          >首页</NavLink>

          <div className="menu right">
            {userLink}
            
            <NavLink to="/write" className={` item`}
            activeClassName="active"
            >写文章</NavLink>
          </div>
         
        </div>
      </div>
    )
  }
}
Nav.propTypes=propTypes;