import React, { useState } from 'react';
import Input from '../UI/Input';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index'
import { Redirect } from 'react-router-dom';


const Register = (state) => {

  let group = ''
  if(state.groupToJoin._id){
    group = "/" + state.groupToJoin._id
  }

  const onChange = e => {
    const index = inputs.findIndex(input => {
      return input.inputId === e.target.id
    })

    const updatedData = {...formData}
    updatedData.inputs[index].valueInput = e.target.value
    setFormData({ ...updatedData});
  }


  let loading = null;
  if(state.registering){
    loading = <div className="spinner-border text-light"></div>
  }

  let redirectToGroups = null;

  let onSubmitMessage = null;
  let formMessage = ''
  if(state.message){
    if(state.registered === true) {
      formMessage = "alert alert-success space"
      redirectToGroups = <Redirect to="/dashboard"/>
    } else {
      formMessage = "alert alert-danger space"
    }
    onSubmitMessage = <p className={formMessage}>
    <strong>{state.message}</strong>
    </p>
  }


  const onSubmit = async e => {
    e.preventDefault(e);
    if (formData.inputs[2].valueInput !== formData.inputs[3].valueInput) {
      state.noMatch()
    } else {
      // console.log({name: inputs[0].valueInput, email: inputs[1].valueInput, password: inputs[2].valueInput});
      state.onRegister(inputs[0].valueInput, inputs[1].valueInput, inputs[2].valueInput, group)
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
      {redirectToGroups}
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
        <button type="submit" className="btn btn-primary space">
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
    registering: state.authentication.registering,
    registered: state.authentication.authStatus,
    message: state.authentication.regMessage,
    groupToJoin: state.getGroups.groupToJoin
  }
}


const mapDispatchToProps = dispatch => {
  return {
    noMatch: () => dispatch(actionTypes.wrongPasswords()),
    onRegister: (name, email, password, group) => dispatch(actionTypes.register(name, email, password, group))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
