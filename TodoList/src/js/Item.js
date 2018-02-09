import React from "react";
import PropTypes from "prop-types"
let propTypes={
  todo:PropTypes.object,
  deleteTodos:PropTypes.func,
  itemEditDone:PropTypes.func,
  onToggle:PropTypes.func
}
export default class Item extends React.Component{
  constructor(props){
    super(props)
    this.state={
      inEdit:false,
      val:""
    }
    this.onInEdit=this.onInEdit.bind(this);
    this.onEnter=this.onEnter.bind(this);
    this.inputChange=this.inputChange.bind(this);
  }
  //双击函数
  onInEdit(){
    let {value}=this.props.item;
    this.setState({
      inEdit:true,
      val:value 
    },
    ()=>this.refs.editInput.focus())
    // console.log(()=>this.refs.editInput.focus());
  }
  //获取value
  inputChange(ev){
    this.setState({
      val:ev.target.value
    })
  }
  //键盘事件
  onEnter(ev){
    if(ev.keyCode===13){ 
    let {itemEditDone,item} =this.props;
      if(this.state.val){

      }
    itemEditDone(item,this.state.val);
    this.setState({
      inEdit:false
    })
    return
    }else if(ev.keyCode===27){
      this.setState({
        inEdit:false
      })
    }
  }
  render(){
    let{onInEdit,onEnter,inputChange}=this;
    let {item,deleteTodos,onToggle}=this.props;
    let {inEdit,val}=this.state;
    let liClassName= item.hasCompleted ? "completed" : "";
    if(inEdit){
      liClassName+="editing"
    }
    return (
      <li className={liClassName}>
        <div className="view">
          <input type="checkbox" className="toggle"
          checked={item.hasCompleted}
          onChange={(ev)=>{onToggle(item)}}
          />
          <label 
            onDoubleClick={
              onInEdit
            }
          > {item.value}</label>
          <button className="destroy"
            onClick={ev=>deleteTodos(item)}
          ></button>
        </div>
        <input 
        type="text" 
        className="edit"
        value={val}
        onKeyDown={onEnter}//键盘事件
        onChange={inputChange}
        ref="editInput"
        />
      </li>
    )
  }
}
Item.propTypes=propTypes