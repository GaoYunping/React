
//注册组件
import React, {Component} from 'react';
import Panel from './Panel';
import S from './style.scss';
import Validation from "util/validation.js"
// import { V4MAPPED } from 'dns';

let propTypes={
  signUpAjax:PT.func,
  signUpMsg:PT.object
}
export default class SignUpPanel extends Component {
  constructor(props) {
    super(props);
    this.state={
      username:"",
      passw:"",
      confirmPassw:"",
      nameErr:false,
      passwErr:false,
      confirmPasswErr:false
    }
    this.validator=new Validation()
    this.validator.addByValue("name",[
      {strategy: 'isEmpty', errorMsg: '用户名不能是空'},
      {strategy: 'hasSpace', errorMsg: '用户名不能有空格'},
      {strategy: 'maxLength:10', errorMsg: '最长为10'}
    ])
    this.validator.addByValue("passw",[
      {strategy: 'isEmpty', errorMsg: '密码不能是空'},
      {strategy: 'hasSpace', errorMsg: '密码不能有空格'},
      {strategy: 'maxLength:10', errorMsg: '最长为10'},
    ])

     this.nameChange = this.nameChange.bind(this);
     this.passwChange = this.passwChange.bind(this);
     this.cfPasswChange = this.cfPasswChange.bind(this);
     this.onSubmit=this.onSubmit.bind(this);

  }
  nameChange(ev){
    let {target}=ev;
    let msg = this.validator.valiOneByValue("name",target.value);

    this.setState({
      username:target.value,
      nameErr:msg
    })
  }
  passwChange(ev){
    let {target}=ev;
    let msg = this.validator.valiOneByValue("passw",target.value);
    let {confirmPasswErr}=this.state
    this.setState({
      passw:target.value,
      passwErr:msg

    })
    if(confirmPasswErr){
      this.cfPasswChange()
    }
  }
  cfPasswChange(){
    let {passwDom,cfPasswDom}=this.refs;
    let confirmPasswErr  =  passwDom.value ===cfPasswDom.value ? "" : "密码不一致"
    this.setState({
      confirmPassw: cfPasswDom.value,
      confirmPasswErr
    })
  }
  onSubmit(ev){
    ev.stopPropagation();
    ev.preventDefault();
    let {validator}=this;
    let {username,passw,confirmPassw}=this.state;
    let nameErr = this.validator.valiOneByValue("name",username);
    let passwErr = this.validator.valiOneByValue("passw",passw);
    let confirmPasswErr = passw=== confirmPassw ? "" : "密码不一致";
    this.setState({
      nameErr,passwErr,confirmPasswErr
    })
    
    if(!nameErr && !passwErr && !confirmPasswErr){
      this.props.signUpAjax({
        username,passw,confirmPassw
      })
    }

  }
  render() {
    let {username,passw, confirmPassw,nameErr, passwErr,
      confirmPasswErr}=this.state
    let {nameChange, passwChange,cfPasswChange,onSubmit} = this

    let nameErrMsg=nameErr ? (
      <p className={S.err}>{nameErr}</p>
    ):"";
    let passwErrMsg=passwErr ?(
      <p className={S.err}>{passwErr}</p>
    ):"";
    let cfPasswErrMsg=confirmPasswErr ?(
      <p className={S.err}>{confirmPasswErr}</p>
    ):"";
    let {signUpMsg}=this.props;
    console.log(signUpMsg)

    let resInfo=null
    if(signUpMsg){
      if(signUpMsg.code===0){
        resInfo=(
          <div className="ui message positive">
            <p>{signUpMsg.msg}</p>
            <p>马上帮你登录</p>
          </div>
        )

      }else{
        resInfo=(
          <div className="ui message error">
            <p>{signUpMsg.msg}</p>
          </div>
        )
      }
    }

    return (
      <div className={S.sign_panel}>
        {resInfo}
        <form className="ui form"
          onSubmit={onSubmit}
        >
          <div className={`field ${nameErr ? "error" : ""}`}>
            <input type="text" 
            placeholder="用户名" 
            value={username}
            onChange={nameChange}
            ref="nameDom"/>
            {nameErrMsg}
          </div> 
          <div className={`field ${passwErr ? "error" : ""}`}>
            <input type="text" 
            placeholder="密码"
            ref="passwDom"
            value={passw}
            onChange={passwChange}
            />
            {passwErrMsg}
          </div>
          <div className={`field ${confirmPasswErr ? "error" : ""}`}>
            <input type="text"
             placeholder="确认密码" 
             value={confirmPassw}
             onChange={cfPasswChange}
             ref="cfPasswDom"
             />
             {confirmPasswErr}
          </div>
          <div className="field">
            <button type="submit" className="ui button fluid primary">注册</button>
          </div>
        </form>
      </div>
    );
  }
}
SignUpPanel.propTypes=propTypes