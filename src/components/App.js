import React, {Component} from "react";
import { findDOMNode }  from "react-dom";
import { data } from "../data";
import Row from "./Row";

data.byString = function(s) {
  if (s==='') return this;
  let o = this;
  s = s.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');         
  const a = s.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
      const k = a[i];
      if (k in o) o = o[k];
      else return;
  }
  return o;
}

const createTree = (treeData, level = 0, path='')=> {
  const item = Object.keys(treeData)
    .filter(field => field !== 'children')
    .reduce((acc, e) => acc = {...acc, [e]: treeData[e]}, {})
  const children = treeData.children
  return (
    [<Row {...item} level={level} path={path} data-path={path} />, 
      children.map((e,i) => createTree(e, level + 1, `${path}.children[${i}]`))
    ]);
};

class App extends Component {
  wrapper = React.createRef()
  clickHandler = (event) => {
    if (event.target.tagName==="INPUT"){
      const nodeWrapper = findDOMNode(this.wrapper.current);
      const selectedPath = event.target.dataset.path;
      let nodes = ( !!selectedPath
                  ? nodeWrapper.querySelectorAll(`[data-path^="${event.target.dataset.path}"]`)
                  : nodeWrapper.querySelectorAll(`[data-path]`))
      const checked = nodes[0].checked;
      nodes.forEach(element =>{ element.checked=checked; data.byString(element.dataset.path).checked = checked });
      console.log(JSON.stringify(data, null, 2));
    }
  }
  render(){
    return <div onClick = {this.clickHandler}><div ref = {this.wrapper}>{createTree(data)}</div></div>  
  }
}

export default App;
