import React, { Component } from 'react';
//引入导航
import Nav from "nav/Nav.js";
import S from "./style.scss";
import {Route ,Redirect} from "react-router-dom";
//引入首页
import Home from "view/home/Home.js";
//注册页面
import SignUp from "view/user/SignUp.js";
//登陆页面
import SignIn from "view/user/SignIn.js";
//请求地址
import cfg from "config/config.json";
// 
import MyPage from "view/user/MyPage.js";
export default class Frame extends Component {
  constructor(props){
     super(props);
     this.state={
       myInfo:null,
       signInMsg:null,
       signUpMsg:null,
       hasLoginReq:false
     }
     this.signInAjax=this.signInAjax.bind(this);
     this.signUpAjax=this.signUpAjax.bind(this);
     this.clearLoginMsg=this.clearLoginMsg.bind(this);
     this.initMyInfo=this.initMyInfo.bind(this);
     this.logOut=this.logOut.bind(this);
  }

  //清除错误信息
  clearLoginMsg(){
    this.setState({
      signInMsg:null,
      signUpMsg:null
    })
  }
  //初始化登录注册
  initMyInfo(myInfo){
    if(myInfo){
    myInfo.avatar = cfg.url+myInfo.avatar;

    }
    this.setState({myInfo})

  }

  //登录请求函数
  signInAjax(reqData){
    $.post(`${cfg.url}/login`,reqData)
    .done(ret=>{
        let {code, data} = ret;
        if(code===0){
          this.initMyInfo(ret.data)
          
        }else{
          this.setState({signInMsg:ret});
        }

    });
  }

  //注册请求函数
  signUpAjax(reqData){
    $.post(`${cfg.url}/register`,reqData)
    .done((ret)=>{
      let {code,data}=ret;
      this.setState({signUpMsg:ret})
      if(code===0){
        setTimeout(()=>{
          this.initMyInfo(ret.data)
        })
      }
    })
  }
  //注销
  logOut(){
    $.post(`${cfg.url}/logout`)
    .done(({code})=>{
      if(code===0){
        this.initMyInfo(null);
      }
    })
  }
  //组件挂在完成后
  componentDidMount(){
    $.post(`${cfg.url}/autologin`)
    .done(({code,data})=>{
      if(code===0){
        this.initMyInfo(data)
      }
      this.setState({hasLoginReq:true})
    })
  }
  render() {

    let {signInAjax,signUpAjax,clearLoginMsg,logOut}=this;
    let {myInfo,signInMsg,signUpMsg,hasLoginReq}=this.state;
    if(!hasLoginReq){
      return(
        <div></div>
      )
    }
    return (
      <div className={S.layout}>
        {/* 导航 */}
        <Nav {...{myInfo,logOut}}></Nav>
        {/* 首页 */}
        <Route exact path='/' component={Home}/>
        {/* 登录 */}
        <Route exact path='/sign_in' render={
          (props)=>( 
            myInfo ? (<Redirect to="/" /> ) :( <SignIn {...{signInAjax,signInMsg,clearLoginMsg}}/> )
          )
        }/>
        {/* 注册 */}
        <Route exact path='/sign_up' render={
          (props)=>(
            myInfo ? (<Redirect to="/" /> ) :(<SignUp {...{ signUpAjax,signUpMsg,clearLoginMsg}}/> )
          )
        }/>
        {/* 用户*/}
        <Route exact path='/my_page' render={
          (props)=>(
            <MyPage/>
          )
        }/>
      </div>
    )
  }
}
