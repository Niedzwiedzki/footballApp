import React from 'react';



const Input = (props) => {
  return (
    <div className={props.divClass}>
          <label className={props.labelClass}>{props.label}</label>
          <input
            id={props.id}
            type={props.type}
            className={props.inputClass}
            value={props.value}
            onChange={(e) => props.change(e)}
          />
    </div>
  );
};

export default Input;