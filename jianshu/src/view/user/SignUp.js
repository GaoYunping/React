import SignUpPanel from 'components/user/SignUpPanel';
import EntryPanel from 'components/user/Panel';

let propTypes={
  signUpMsg:PT.object,
  signUpAjax:PT.func,
  clearLoginMsg:PT.func
}
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  //组件卸载时执行
  componentWillUnmount(){
    this.props.clearLoginMsg()
  }
  render() {
    let {signUpMsg,signUpAjax}=this.props
    return (
      <EntryPanel >
        <SignUpPanel {...{signUpMsg,signUpAjax}}/>
      </EntryPanel>
    );
  }
}
SignUp.propTypes=propTypes;