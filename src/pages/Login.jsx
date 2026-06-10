import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const isFormFilled = formData.email.trim() !== '' && formData.password.trim() !== '';

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormFilled) {
      navigate('/account-settings');
    }
  };

  return (
    <div className="login-page page-enter">
      <div className="login-content">
        <h1 className="login-title">
          Signin to your<br />PopX account
        </h1>
        <p className="login-subtitle">
          Lorem ipsum dolor sit amet,<br />
          consectetur adipiscing elit,
        </p>

        <form id="login-form" className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="input-label" htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="input-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <button
            id="btn-login"
            type="submit"
            className={`btn ${isFormFilled ? 'btn-primary' : 'btn-disabled'}`}
            disabled={!isFormFilled}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
