//首页
//引入left
import PreviewList from '../../layout/preview/PreviwList.js';
//引入right
import Recommend from '../../components/home/Recommend.js';
// 接口
import cfg from 'config/config.json';
import React, {Component} from 'react'
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      previews:[],
      authors:[]
    }
  }
  // 组件挂载完成后
  componentDidMount(){
    $.post(`${cfg.url}/getPreview`)
    .done(ret=>{
      if(ret.code===0){
        this.setState({
          previews:ret.data
        })

      }
    })
    $.post(`${cfg.url}/getAuthor`)
    .done(ret=>{
      if(ret.code===0){
        this.setState({
          authors:ret.data
        })
      }
    })
  }
  render() {
    let {previews,authors}=this.state;
    return (
      <div className="ui container grid">
        <div className="column twelve wide">
          <PreviewList
            {...{previews}}
          ></PreviewList>
        </div>
        <div className="column four wide">
          <Recommend {...{authors}}>
          </Recommend>
        </div>
      </div>
    )
  }
}
