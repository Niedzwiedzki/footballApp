import React, { useState } from 'react';
import Input from '../UI/Input'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index'

const Login = (state) => {

  const onChange = e => {
    const index = inputs.findIndex(input => {
      return input.inputId == e.target.id
    })

    const updatedData = { ...formData }
    updatedData.inputs[index].valueInput = e.target.value
    setFormData({ ...updatedData });
  }

  const onSubmit = e => {
    e.preventDefault(e);
    state.logIn()
    console.log(state.loggedIn)
    console.log({ email: inputs[0].valueInput, password: inputs[1].valueInput });

  };

  const [formData, setFormData] = useState({
    inputs: [
      {
        styleDiv: "form-group",
        styleLabel: null,
        titleLabel: "Email address:",
        inputId: "loginEmail",
        inputType: "email",
        styleInput: "form-control",
        valueInput: "",
        change: onChange
      },
      {
        styleDiv: "form-group",
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
          inputs.map(function (input) {
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
const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}


const mapDispatchToProps = dispatch => {
  return {
    logIn: () => dispatch(actionTypes.login())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
