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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/account-settings', {
      state: {
        name: formData.fullName || 'Marry Doe',
        email: formData.emailAddress || 'Marry@Gmail.Com',
      },
    });
  };

  return (
    <div className="create-account-page page-enter">
      <div className="create-account-content">
        <h1 className="create-account-title">
          Create your<br />PopX account
        </h1>

        <form id="create-account-form" className="create-account-form" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label className="input-label" htmlFor="ca-full-name">
              Full Name<span className="required-star">*</span>
            </label>
            <input
              id="ca-full-name"
              type="text"
              name="fullName"
              placeholder="Marry Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label className="input-label" htmlFor="ca-phone">
              Phone number<span className="required-star">*</span>
            </label>
            <input
              id="ca-phone"
              type="tel"
              name="phoneNumber"
              placeholder="Marry Doe"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              autoComplete="tel"
            />
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label className="input-label" htmlFor="ca-email">
              Email address<span className="required-star">*</span>
            </label>
            <input
              id="ca-email"
              type="email"
              name="emailAddress"
              placeholder="Marry Doe"
              value={formData.emailAddress}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="input-label" htmlFor="ca-password">
              Password <span className="required-star">*</span>
            </label>
            <input
              id="ca-password"
              type="password"
              name="password"
              placeholder="Marry Doe"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          {/* Company Name */}
          <div className="form-group">
            <label className="input-label" htmlFor="ca-company">Company name</label>
            <input
              id="ca-company"
              type="text"
              name="companyName"
              placeholder="Marry Doe"
              value={formData.companyName}
              onChange={handleChange}
              autoComplete="organization"
            />
          </div>

          {/* Agency Radio */}
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
