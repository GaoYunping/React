import React from "react";
import {Link} from "react-router-dom";
import  PropTypes from "prop-types";

let propTypes ={
  deleteAll:PropTypes.func,
  leftCount:PropTypes.number,
  showClearBotton:PropTypes.bool,
  pathname:PropTypes.string
}

export default class Footer extends React.Component {

  render(){
    let {deleteAll,leftCount,showClearBotton,pathname}=this.props
    let clearBtn=null;
    if(showClearBotton ){
      clearBtn=(
        <button 
        className="clear-completed"
        onClick={deleteAll}
        >
          clesr all completed
        </button>
      )
    }
    return(
      <footer className="footer">
        <span className="todo-count">
          <strong>{leftCount}</strong>
          <span>item ledt</span>
        </span>
        <ul className="filters">
          <li>
            <Link to="/"
            className={pathname==="/" ? "selected" :""}
          
            >All</Link>
          </li>
          <li>
            <Link to="/Active"
            className={pathname==="/Active" ? "selected" :""  }
            
            >Active</Link>
            
          </li>
          <li>
            <Link to="/Completed"
            className={pathname==="/Completed" ? "selected" :""  }
            >Completed</Link>
            
          </li>
        </ul>
        {clearBtn}
      </footer>
    )
  }
};
Footer.propTypes=propTypes