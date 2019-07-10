import React, { useState } from 'react';



const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault(e);
    if (password !== password2) {
      console.log('Password do not match')
    } else {
      console.log('ok')
    }
  };

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => onChange(e)}
            id="name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email address:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => onChange(e)}
            id="email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => onChange(e)}
            id="password"
            required
          />
        </div>
        <div className="form-group">
          <label>Retype password:</label>
          <input
            type="password"
            className="form-control"
            value={password2}
            onChange={e => onChange(e)}
            id="password2"
            required
          />
        </div>
        <div className="form-group form-check">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" /> Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};


export default Register;
