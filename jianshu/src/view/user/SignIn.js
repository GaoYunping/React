import SignInPanel from 'components/user/SignInPanel.js';
import EntryPanel from 'components/user/Panel.js';

let propTypes={
  signInAjax:PT.func,
  signInMsg:PT.object,
  clearLoginMsg:PT.func
}
export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }
  //组件卸载的时候
  componentWillUnmount(){
    this.props.clearLoginMsg()
  }

  render() {
    let {signInAjax,signInMsg}=this.props
   
    return (
      <EntryPanel >
        <SignInPanel {...{signInAjax,signInMsg}}/>
      </EntryPanel>
    );
  }
}
SignIn.propTypes=propTypes;