import React from 'react';
import ReactDOM from 'react-dom';
import Item from "./js/Item.js";
import Footer from "./js/Footer.js";
import {BrowserRouter as Router,Route} from "react-router-dom";
require ("./css/base.css");
require("./css/index.css");

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      todosData:[],
      inputval:""
    }
    this.addTodos=this.addTodos.bind(this);
    this.deleteAll=this.deleteAll.bind(this);
    this.deleteTodos=this.deleteTodos.bind(this);
    this.chengeVal=this.chengeVal.bind(this);
    this.toggleAll=this.toggleAll.bind(this);
    this.onToggle=this.onToggle.bind(this);
    this.itemEditDone=this.itemEditDone.bind(this)
  }
  itemEditDone(todo,value){
    let {todosData}=this.state;
    todosData=todosData.map((elt)=>{
      if(elt.id===todo.id){
        elt.value=value;
      }
      return elt
    })
  }
  
  
  //全选
  toggleAll(ev){
    //获取全选的状态
    let {checked}=ev.target;
    let {todosData}=this.state;
    // 把每一条数据的状态改变为和全选按钮一样的状态
    todosData=todosData.map((item)=>{
      item.hasCompleted=checked;
      return item;
    })
    //改变 数据
    this.setState({todosData})
  }
  // //单选

  onToggle(todo){

    let {todosData}=this.state;
    todosData=todosData.map((item)=>{
      if(item.id===todo.id){
        // 改变单选按钮的自身状态
        item.hasCompleted=!item.hasCompleted
      } 
      return item
    })
    //改变数据
    this.setState({todosData})

  }
  //输入框值判断
  chengeVal(ev){
    this.setState({
      inputval:ev.target.value
    })
  }
  //添加todo
  addTodos(ev){
    //键盘按键是否是13，如果不是return，
    if(ev.keyCode!==13) return
    let {inputval} =this.state;
    //去除左右空格
    let value=inputval.trim();
    //判断value是否等于空
    if(value===""){ 
      //如果等于空return
      return;
    }
    //创建对象
    let todo={
      id:new Date().getTime(),
      value:value,
      hasCompleted:false
    };
    let {todosData}=this.state;
    todosData.push(todo);
    //改变state
    this.setState({
      todosData,
      inputval:""
    });
    
  }
  
  // 删除todo

  deleteTodos(todo){
    let {todosData}=this.state;
    todosData=todosData.filter((elt)=>{
    // 把不等于要删除的数据返回
      return elt.id!==todo.id
    });
    // 重新渲染数据
    this.setState({todosData})
  }

  // //删除全部完成todo
  deleteAll(elt){
    let {todosData}=this.state;
    //过滤
    todosData=todosData.filter((elt)=>{
      return !elt.hasCompleted
    });
    this.setState({todosData
    })
  }

  render(){
    //获取方法
    let {addTodos, deleteTodos, deleteAll, chengeVal, toggleAll, onToggle,itemEditDone } = this;
    //获取state
    let {todosData,inputval}=this.state;
    // //声明变量用来记录有多少条数据，病渲染数据
    let items=null;
    // //声明变量用来记录要不要加载
    let itemsBox  =null;
    //声明用来记录要不要加载footer
    let footer=null;
   
    // //用来计算有完成的数量默认全部未完成、
    let leftCount = todosData.length

    //获取路径
    let {location:{pathname}}=this.props;
    // //循环数组。
    items=todosData.filter(elt=>{
      //判断数据的完成状态
      if(elt.hasCompleted){
        //每完成一个未完成的数量减1
        leftCount--
      } 
      //判断路径
      switch (pathname) {
        //如果是未完成就return hasCompleted 状态为false取反；
        case "/Active":
             return !elt.hasCompleted;
            //  如果状态为完成的那么返回状态为true的
        case "/Completed":
             return  elt.hasCompleted;
        default:
          // return 所有
          return true
      }
    })
    // 过滤完循环筛选后的数据
    items=items.map((item,i)=>{
      //判断每一条todo的完成状态，如果每有一条完成那么leftCount自减1
      return(
        <Item {...{
          deleteTodos,//删除函数
          item,//每一条数据
          onToggle,//单选函数
          itemEditDone//
        }}
        key={i} 
        ></Item>
      )
    })
    //判断todosData是否有数据
    if(todosData.length){
      itemsBox=(
        <section className="main">
          <input 
          type="checkbox" 
          checked={leftCount===0}
          onChange={toggleAll}   //全选
          className="toggle-all"
          />
          <ul className= "todo-list">
          {items}
          </ul>
        </section>
      );
      footer=<Footer 
        {...{
          deleteAll,//全部删除函数
          leftCount,//数目
          showClearBotton:leftCount<todosData.length,
          pathname//路径
        }}
      />

    }
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input type="text" 
          className="new-todo"
          value={inputval}
          onChange={chengeVal}
          onKeyDown={addTodos}
          placeholder="type something here"
          />
        </header>
        {itemsBox}
        {footer}
      </div>
    )
  }
}



ReactDOM.render(
  <Router>
   <Route path='/' component={App}/>
  </Router>
  , document.getElementById('root')
);
