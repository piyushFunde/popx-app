import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page page-enter">
      {/* Empty hero area — matches the design's large blank top section */}
      <div className="welcome-hero" aria-hidden="true" />

      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to PopX</h1>
        <p className="welcome-subtitle">
          Lorem ipsum dolor sit amet,<br />
          consectetur adipiscing elit,
        </p>

        <div className="welcome-actions">
          <button
            id="btn-create-account"
            className="btn btn-primary"
            onClick={() => navigate('/create-account')}
          >
            Create Account
          </button>

          <button
            id="btn-already-registered"
            className="btn btn-secondary"
            onClick={() => navigate('/login')}
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
