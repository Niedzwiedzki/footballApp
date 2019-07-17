import React, { useState } from 'react';
import Input from '../UI/Input'



const Register = () => {


  const onChange = e => {
    const index = inputs.findIndex(input => {
      return input.inputId == e.target.id
    })

    const updatedData = {...formData}
    updatedData.inputs[index].valueInput = e.target.value
    setFormData({ ...updatedData});
  }

  const onSubmit = async e => {
    e.preventDefault(e);
    if (formData.inputs[2].valueInput !== formData.inputs[3].valueInput) {
      console.log('Password do not match')
    } else {
      console.log({name: inputs[0].valueInput, email: inputs[1].valueInput, password: inputs[2].valueInput});
    }
  };


  const [formData, setFormData] = useState({
    inputs: [
      {
        styleDiv:"form-group",
        styleLabel: null,
        titleLabel: "Name:",
        inputId: "name",
        inputType: "text", 
        styleInput: "form-control",
        valueInput: "",
        change: onChange
      },
      {
        styleDiv:"form-group",
        styleLabel: null,
        titleLabel: "Email address:",
        inputId: "email",
        inputType: "email", 
        styleInput: "form-control",
        valueInput: "",
        change: onChange
      },
      {
        styleDiv:"form-group",
        styleLabel: null,
        titleLabel: "Password:",
        inputId: "password",
        inputType: "password", 
        styleInput: "form-control",
        valueInput: "",
        change: onChange
      },
      {
        styleDiv:"form-group",
        styleLabel: null,
        titleLabel: "Retype password:",
        inputId: "password2",
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
      <h3>Register</h3>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};


export default Register;
