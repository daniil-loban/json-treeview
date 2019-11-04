import React, { Component } from "react";
import { findDOMNode }  from "react-dom";
import { data } from "../data";
import Row from "./Row";

data.byString = function(pathInObject) {
  if (!!!pathInObject) return this;
  let objPart = this;
  const pathPart = pathInObject.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '').split('.');
  for (let i = 0, n = pathPart.length; i < n; ++i) {
    const key = pathPart[i];
    if (key in objPart) objPart = objPart[key];
    else return;
  }
  return objPart;
}

const createTree = (treeData, level = 0, path='')=> {
  const children = treeData.children;
  const item = Object.keys(treeData)
    .reduce((acc, e) => {
      if (e !== 'children'){
        acc = {...acc, [e]: treeData[e]}
      }
      return acc;
    }, {})
  return ([<Row {...item} level={level} path={path} data-path={path}/>, 
            children.map((e,i) => createTree(e, level + 1, `${path}.children[${i}]`))
          ]);
};

class App extends Component {
  wrapper = React.createRef()
  clickHandler = (event) => {
    if (event.target.tagName !== "INPUT") return;
    const nodeWrapper = findDOMNode(this.wrapper.current);
    const selectedPath = event.target.dataset.path;
    let nodes = nodeWrapper.querySelectorAll(`[data-path${selectedPath ? `^="${selectedPath}"]` : ']'}`)
    nodes.forEach(element => element.checked = data.byString(element.dataset.path).checked = nodes[0].checked);
    console.log(JSON.stringify(data, null, 2));
  }
  render(){
    return <section ref = {this.wrapper} onClick = {this.clickHandler}>{createTree(data)}</section>  
  }
}

export default App;
