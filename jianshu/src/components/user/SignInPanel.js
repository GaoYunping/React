//登录组件
import React, {Component} from 'react';
import Panel from './Panel';
import S from './style.scss';
import Validation from "util/validation";
let propTypes ={
  signInAjax:PT.func,
  signInMsg:PT.object
}
export default class SignInPanel extends Component {
  constructor(props) {
    super(props);
    this.state={
      userName:"",
      passw:"",
      nameErr:false,
      passwErr:false
    }


    this.validator= new Validation();
    this.validator.addByValue("username",[
      {strategy:"isEmpty",errorMsg:"用户名不能为空"},
      {strategy:"hasSpace",errorMsg:"用户名不能有空格"},
      {strategy:"maxLength:10",errorMsg:"用户名最长为10"},
    ])

    this.validator.addByValue("passw",[
      {strategy:"isEmpty",errorMsg:"密码不能为空"},
      {strategy:"hasSpace",errorMsg:"密码不能有空格"},
      {strategy:"maxLength:10",errorMsg:"密码最长为10"},
    ])

    this.nameChange=this.nameChange.bind(this);
    this.passwChange=this.passwChange.bind(this);
    this.onSubumit=this.onSubumit.bind(this)
    
  }

  nameChange(ev){
    let {target}=ev;
    let msg = this.validator.valiOneByValue("username",target.value)
    this.setState({
      userName:target.value,
      nameErr:msg
    })
  }
  passwChange(ev){
    let {target}=ev;
    let msg = this.validator.valiOneByValue("passw",target.value)
    
    this.setState({
      passw:target.value,
      passwErr:msg
    })
  }
  //登陆提交表单
  onSubumit(ev){
    ev.preventDefault();
    ev.stopPropagation();
    let {validator}=this;
    let {nameDom,passwDom}=this.refs;
    let nameErr = this.validator.valiOneByValue("username",nameDom.value);
    let passwErr= this.validator.valiOneByValue("passw",passwDom.value);
    this.setState({
      nameErr,passwErr
    })
    if(!nameErr&& !passwErr){
      this.props.signInAjax({
        username:nameDom.value,
        passw:passwDom.value
      }
      )
    }
  }



  render() {
    let{userName,passw,nameErr,passwErr}=this.state;
    let {nameChange,passwChange,onSubumit}=this;
    let {signInMsg}=this.props;
    let resInfo=null;
    if(signInMsg&&signInMsg.code!==0){
      resInfo=(
        <div className="ui message error">
          <p>用户名或密码错误</p>
        </div>
      )
    }
    let nameErrMsg=nameErr ? (
      <p className={S.err}>{nameErr}</p>
    ) : null;
    let passwErrMsg=passwErr ? (
      <p className={S.err}>{passwErr}</p>
    ) : null


    
    return (
      <div className={S.sign_panel}>
        {resInfo}
        <form className="ui form"
          onSubmit={onSubumit}
        >
          
          <div className={`field  ${nameErr ? "error" : ""}`}>
            <input type="text"
             placeholder="用户名" 
             value={userName}
             onChange={nameChange}
             ref="nameDom"
             
             />
            {nameErrMsg}
          </div>

          <div className={`field  ${passwErr ? "error" : ""}`}>
            <input type="text" 
            placeholder="密码" 
            value={passw}
            onChange={passwChange}
            ref="passwDom"/>
            {passwErrMsg}
          </div>

          <div className="field">
            <button type="submit" className="ui button fluid primary">登录</button>
          </div>
        </form>
      </div>
    );
  }
}
SignInPanel.propTypes=propTypes;