import React, { useState } from 'react';
import Input from '../UI/Input'

const Login = () => {


  const onChange = e => {
    const index = inputs.findIndex(input => {
      return input.inputId == e.target.id
    })

    const updatedData = {...formData}
    updatedData.inputs[index].valueInput = e.target.value
    setFormData({ ...updatedData});
  }

  const onSubmit = e => {
    e.preventDefault(e);

    console.log({email: inputs[0].valueInput, password: inputs[1].valueInput});
  };

    const [formData, setFormData] = useState({
      inputs: [
        {
          styleDiv:"form-group",
          styleLabel: null,
          titleLabel: "Email address:",
          inputId: "loginEmail",
          inputType: "email", 
          styleInput: "form-control",
          valueInput: "",
          change: onChange
        },
        {
          styleDiv:"form-group",
          styleLabel: null,
          titleLabel: "Password:",
          inputId: "loginPassword",
          inputType: "password", 
          styleInput: "form-control",
          valueInput: "",
          change: onChange
        }
      ]
    });
    const { inputs } = formData;

  

  return (
    <div>
      <h3>Log in</h3>
      <form onSubmit={e => onSubmit(e)}>
      {
          inputs.map(function(input){
              return <Input
              divClass={input.styleDiv}
              labelClass={input.styleLabel}
              label={input.titleLabel}
              id={input.inputId}
              type={input.inputType}
              inputClass={input.styleInput}
              value={input.valueInput}
              change={input.change}
              key={input.inputId}
              />;
          })
      }
        {/* <div className="form-group">
          <label>Email address:</label>
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            value={loginEmail}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            value={loginPassword}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group form-check">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" /> Remember me
          </label>
        </div>
 */}
         <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
