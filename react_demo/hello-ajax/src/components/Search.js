import React, { Component } from 'react';

class componentName extends Component {

  constructor (props) {
    super(props)
    this.searchFun = this.searchFun.bind(this)
    
  }
  

  searchFun(){
    let val=this.refs.searchVal.value;
    this.props.search(val)
  }
  render() {
    let {searchFun}=this
    return (
      <section className="jumbotron">
          <h3 className="jumbotron-heading">Search Github Users</h3>
          <div>
            <input ref="searchVal" type="text" placeholder="enter the name you search"/>
            <button onClick={searchFun}>Search</button>
          </div>
      </section>
    );
  }
}

export default componentName;
