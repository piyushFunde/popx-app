import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const isFormFilled = formData.email.trim() !== '' && formData.password.trim() !== '';

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (loginError) {
      setLoginError('');
    }
  };

  const getStoredUsers = () => {
    const stored = localStorage.getItem('popx_users');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    // Default fallback user
    const defaultUser = {
      fullName: 'Marry Doe',
      phoneNumber: '1234567890',
      emailAddress: 'Marry@Gmail.Com',
      password: 'password',
      companyName: 'PopX',
      isAgency: 'no'
    };
    localStorage.setItem('popx_users', JSON.stringify([defaultUser]));
    return [defaultUser];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormFilled) {
      const users = getStoredUsers();
      const matchedUser = users.find(
        (u) => 
          u.emailAddress.trim().toLowerCase() === formData.email.trim().toLowerCase() && 
          u.password === formData.password
      );

      if (matchedUser) {
        localStorage.setItem('popx_current_user', JSON.stringify(matchedUser));
        navigate('/account-settings', {
          state: {
            name: matchedUser.fullName,
            email: matchedUser.emailAddress,
          }
        });
      } else {
        setLoginError('*Invalid email or password');
      }
    }
  };

  return (
    <div className="login-page page-enter">
      <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="login-content">
        <h1 className="login-title">
          Signin to your<br />PopX account
        </h1>
        <p className="login-subtitle">
          Lorem ipsum dolor sit amet,<br />
          consectetur adipiscing elit,
        </p>

        <form id="login-form" className="login-form" onSubmit={handleSubmit} noValidate>
          <div className={`form-group ${loginError ? 'has-error' : ''}`}>
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

          <div className={`form-group ${loginError ? 'has-error' : ''}`}>
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
            {loginError && <span className="error-message">{loginError}</span>}
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
