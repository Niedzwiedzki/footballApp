import React, { useState } from 'react';
import Input from '../UI/Input'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import { Redirect } from 'react-router-dom';


const Login = (state) => {
  const onChange = e => {
    const index = inputs.findIndex(input => {
      return input.inputId === e.target.id
    })

    const updatedData = { ...formData }
    updatedData.inputs[index].valueInput = e.target.value
    setFormData({ ...updatedData });
  }


  let loading = null;
  if(state.logging){
    loading = <div className="spinner-border text-light"></div>
  }

  let redirectToGroups = null

  let onSubmitMessage = null;
  let formMessage = ''
  if(state.message){
    if(state.loggedIn === true) {
      formMessage = "alert alert-success space"
        redirectToGroups = <Redirect to="/dashboard"/>
    } else {
      formMessage = "alert alert-danger space"
    }
    onSubmitMessage = <p className={formMessage}>
    <strong>{state.message}</strong>
    </p>
  }


  const onSubmit = e => {
    e.preventDefault(e);
    state.onAuth(inputs[0].valueInput, inputs[1].valueInput)
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
      {redirectToGroups}
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
        </button><br/>
        {loading}
        {
          onSubmitMessage
        }
      </form>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    logging: state.login.logging,
    loggedIn: state.login.loggedIn,
    message: state.login.message
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actionTypes.auth(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
