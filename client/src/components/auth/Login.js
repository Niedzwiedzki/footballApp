import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: ''
  });

  const { loginEmail, loginPassword } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = e => {
    e.preventDefault(e);
    console.log(formData);
  };

  return (
    <div>
      <h3>Log in</h3>
      <form action="/action_page.php">
        <div className="form-group">
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
