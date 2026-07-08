import React from 'react';

// Local PNG image from public assets
const MOUNTAIN_IMG = '/Assest/leftSideImg.png';

interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-card card-enter">
        {/* LEFT: Image panel — plain img so it always fills correctly */}
        <div className="auth-image-panel">
          <img
            src={MOUNTAIN_IMG}
            alt="Scenic mountain landscape"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* RIGHT: Form content */}
        <div className="auth-form-panel">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
