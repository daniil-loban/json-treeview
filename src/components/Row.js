import React, {Fragment} from "react";

const Row = props => {
  return (
    <div>
      <input data-path={props.path} type="checkbox" id={props.key} name={props.key}  defaultChecked={props.checked}/>
      <label htmlFor={props.key}>{props.label} (уровень:{props.level})(путь: {props.path})</label>
    </div>
    )
};

export default Row;
