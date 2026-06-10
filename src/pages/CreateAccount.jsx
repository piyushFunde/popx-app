import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';

function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
    companyName: '',
    isAgency: 'yes',
  });

  const [touched, setTouched] = useState({
    fullName: false,
    phoneNumber: false,
    emailAddress: false,
    password: false,
  });

  const getValidationError = (name, value) => {
    switch (name) {
      case 'fullName':
        if (value.trim().length < 3) {
          return '*Must be at least 3 characters';
        }
        return '';
      case 'phoneNumber': {
        const digits = value.replace(/\D/g, '');
        if (digits.length !== 10) {
          return '*Phone Number Must Contain 10 Digits';
        }
        return '';
      }
      case 'emailAddress': {
        if (!value.includes('@')) {
          return '*Must contain @';
        }
        const stored = localStorage.getItem('popx_users');
        if (stored) {
          try {
            const users = JSON.parse(stored);
            if (users.some(u => u.emailAddress.trim().toLowerCase() === value.trim().toLowerCase())) {
              return '*Email is already registered';
            }
          } catch {
            return '';
          }
        }
        return '';
      }
      case 'password':
        if (value.length < 8) {
          return '*Password must contain at least 8 characters.';
        }
        return '';
      default:
        return '';
    }
  };

  const errors = {
    fullName: touched.fullName ? getValidationError('fullName', formData.fullName) : '',
    phoneNumber: touched.phoneNumber ? getValidationError('phoneNumber', formData.phoneNumber) : '',
    emailAddress: touched.emailAddress ? getValidationError('emailAddress', formData.emailAddress) : '',
    password: touched.password ? getValidationError('password', formData.password) : '',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
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
    return [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched to display errors immediately
    const allTouched = {
      fullName: true,
      phoneNumber: true,
      emailAddress: true,
      password: true,
    };
    setTouched(allTouched);

    const nameErr = getValidationError('fullName', formData.fullName);
    const phoneErr = getValidationError('phoneNumber', formData.phoneNumber);
    const emailErr = getValidationError('emailAddress', formData.emailAddress);
    const passErr = getValidationError('password', formData.password);

    if (nameErr || phoneErr || emailErr || passErr) {
      return;
    }

    const newUser = {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      emailAddress: formData.emailAddress,
      password: formData.password,
      companyName: formData.companyName,
      isAgency: formData.isAgency
    };

    const users = getStoredUsers();
    localStorage.setItem('popx_users', JSON.stringify([...users, newUser]));
    localStorage.setItem('popx_current_user', JSON.stringify(newUser));

    navigate('/account-settings', {
      state: {
        name: formData.fullName,
        email: formData.emailAddress,
      },
    });
  };

  return (
    <div className="create-account-page page-enter">
      <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="create-account-content">
        <h1 className="create-account-title">
          Create your<br />PopX account
        </h1>

        <form id="create-account-form" className="create-account-form" onSubmit={handleSubmit} noValidate>
          <div className={`form-group ${errors.fullName ? 'has-error' : ''}`}>
            <label className="input-label" htmlFor="ca-full-name">
              Full Name<span className="required-star">*</span>
            </label>
            <input
              id="ca-full-name"
              type="text"
              name="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete="name"
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className={`form-group ${errors.phoneNumber ? 'has-error' : ''}`}>
            <label className="input-label" htmlFor="ca-phone">
              Phone number<span className="required-star">*</span>
            </label>
            <input
              id="ca-phone"
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete="tel"
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          <div className={`form-group ${errors.emailAddress ? 'has-error' : ''}`}>
            <label className="input-label" htmlFor="ca-email">
              Email address<span className="required-star">*</span>
            </label>
            <input
              id="ca-email"
              type="email"
              name="emailAddress"
              placeholder="Enter your email address"
              value={formData.emailAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete="email"
            />
            {errors.emailAddress && <span className="error-message">{errors.emailAddress}</span>}
          </div>

          <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
            <label className="input-label" htmlFor="ca-password">
              Password <span className="required-star">*</span>
            </label>
            <input
              id="ca-password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete="new-password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label className="input-label" htmlFor="ca-company">Company name</label>
            <input
              id="ca-company"
              type="text"
              name="companyName"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleChange}
              autoComplete="organization"
            />
          </div>

          <div className="agency-section">
            <p className="agency-question">
              Are you an Agency?<span className="required-star">*</span>
            </p>
            <div className="radio-group">
              <label className="radio-label" htmlFor="agency-yes">
                <input
                  id="agency-yes"
                  type="radio"
                  name="isAgency"
                  value="yes"
                  checked={formData.isAgency === 'yes'}
                  onChange={handleChange}
                />
                <span className="radio-custom" />
                Yes
              </label>

              <label className="radio-label" htmlFor="agency-no">
                <input
                  id="agency-no"
                  type="radio"
                  name="isAgency"
                  value="no"
                  checked={formData.isAgency === 'no'}
                  onChange={handleChange}
                />
                <span className="radio-custom" />
                No
              </label>
            </div>
          </div>

          <div className="create-account-footer">
            <button
              id="btn-submit-create"
              type="submit"
              className="btn btn-primary"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
