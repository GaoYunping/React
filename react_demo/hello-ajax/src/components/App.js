import React, {Component} from 'react';
import List from './List';
import Search from './Search'
export default class App extends Component {
  constructor (props) {
    super(props)
    this.state={
      searchName:"",
    }
    this.search = this.search.bind(this)
    
  }
  search(val){
    let searchName=val;
    this.setState({searchName})
  }
  render() {
    let {search}=this
    let {searchName}=this.state

    return (
      <div className="container">
        <Search search={search}></Search>
        <List searchName={searchName}></List>
      </div>
    )
  }
}
