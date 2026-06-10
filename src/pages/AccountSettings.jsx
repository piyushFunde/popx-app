import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AccountSettings.css';

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function AccountSettings() {
  const location = useLocation();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Load from localStorage or state or fallback to default Marry Doe
  const getLoggedInUser = () => {
    const stored = localStorage.getItem('popx_current_user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  };

  const currentUser = getLoggedInUser();
  const userName = currentUser?.fullName || location.state?.name || 'Marry Doe';
  const userEmail = currentUser?.emailAddress || location.state?.email || 'Marry@Gmail.Com';

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogout = () => {
    localStorage.removeItem('popx_current_user');
    navigate('/');
  };

  return (
    <div className="account-settings-page page-enter">
      <div className="settings-header">
        <h1 className="settings-title">Account Settings</h1>
      </div>

      <div className="settings-body">
        <div className="profile-section">
          <div className="avatar-wrapper" role="button" tabIndex={0} onClick={handleAvatarClick} aria-label="Change profile photo">
            <img
              src="/avatar.png"
              alt={`Profile photo of ${userName}`}
              className="avatar-img"
            />
            <button
              id="btn-change-avatar"
              className="camera-btn"
              aria-label="Upload new photo"
              tabIndex={-1}
            >
              <CameraIcon />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              aria-hidden="true"
            />
          </div>

          <div className="profile-info">
            <p className="profile-name">{userName}</p>
            <p className="profile-email">{userEmail}</p>
          </div>
        </div>

        <div className="settings-divider" />

        <p className="profile-bio">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing
          Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut
          Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </p>

        <div className="settings-divider-dashed" />

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <LogoutIcon /> Log out
        </button>
      </div>
    </div>
  );
}

export default AccountSettings;
