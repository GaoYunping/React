import React, {Component} from 'react'
import axios from "axios"
export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstView: true,
      loading: false,
      succeed: null,
      error: null
    }
  }

  componentWillReceiveProps(nextProps) {
    //修改状态为loading..
    this.setState({firstView: false, loading: true});
    
    let searchName = nextProps.searchName;
    let url = `https://api.github.com/search/users?q=${searchName}`;
    //发送请求
    axios(url).then((response) => {
      let succeed = response.data.items
      //改变状态
      this.setState({loading: false, succeed:succeed})
    }).catch((error) => {
      this.setState({loading: false, error: error})
    })

  }

  render() {
    let {firstView, loading, succeed, error} = this.state;

    if (firstView) {
      return <p>Enter name to search</p>
    } else if (loading) {
      return <p>loading...</p>
    } else if (succeed) {
      return (
        <div className="row">
            {
              succeed.map((item,index)=>{
                return(
                  <div className="card" key={index}>
                    <a href={item.html_url} target="_blank">
                      <img
                        src={item.avatar_url}
                        style={{
                        width: "100px"
                      }}/>
                    </a>
                    <p className="card-text">{item.login}</p>
                  </div>
                )
              })
            }
        </div>
      )
      

    } else if (error) {
      return (
        <p>{error}</p>
      )
    }

  }
}
