import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../LazyImage/LazyImage';

const AVATAR = 'https://randomuser.me/api/portraits/men/32.jpg';

const navItems = [
  { icon: 'fa-th-large', label: 'Dashboard', path: '/dashboard' },
  { icon: 'fa-shopping-bag', label: 'Orders', path: '/orders' },
  { icon: 'fa-car', label: 'Rides', path: '/rides' },
  { icon: 'fa-users', label: 'Clients', path: '/clients' },
  { icon: 'fa-id-card', label: 'Drivers', path: '/drivers' },
  { icon: 'fa-clock', label: 'Shift', path: '/shift' },
  { icon: 'fa-map-marked-alt', label: 'Live map', path: '/livemap' },
  { icon: 'fa-car-side', label: 'Car classes', path: '/carclasses' },
  { icon: 'fa-code-branch', label: 'Branches', path: '/branches' },
  { icon: 'fa-user-shield', label: 'Moderators', path: '/moderators' },
  { icon: 'fa-cog', label: 'Settings', path: '/settings' },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open = true, onClose }) => {
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState('Maharram');
  const [showDevToast, setShowDevToast] = useState(false);

  useEffect(() => {
    const storedUserRaw = localStorage.getItem('registeredUser');
    if (storedUserRaw) {
      try {
        const user = JSON.parse(storedUserRaw);
        if (user.email) {
          const prefix = user.email.split('@')[0];
          setProfileName(prefix.charAt(0).toUpperCase() + prefix.slice(1));
        }
      } catch (e) {
        // Fallback to Maharram
      }
    }
  }, []);

  const handleLinkClick = (path: string) => {
    if (path === '/dashboard') {
      navigate('/dashboard');
      onClose?.();
    } else {
      // Show Development in Progress toast
      setShowDevToast(true);
    }
  };

  // Auto-dismiss development toast
  useEffect(() => {
    if (showDevToast) {
      const timer = setTimeout(() => {
        setShowDevToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showDevToast]);

  return (
    <>
      {/* Dev in Progress Toast Notification */}
      {showDevToast && (
        <>
          <style>{`
            @keyframes slideDownToast {
              from { transform: translate(-50%, -20px); opacity: 0; }
              to { transform: translate(-50%, 0); opacity: 1; }
            }
            .dev-toast {
              animation: slideDownToast 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}</style>
          <div
            className="dev-toast"
            style={{
              position: 'fixed',
              top: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10000,
              width: '90%',
              maxWidth: 400,
              background: 'rgba(31, 41, 55, 0.95)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
              borderRadius: 10,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
            role="alert"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f59e0b',
                  flexShrink: 0,
                }}
              >
                <i className="fas fa-tools" style={{ fontSize: '0.85rem' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>
                  Under Development
                </div>
                <div style={{ fontSize: '0.75rem', color: '#d1d5db', marginTop: 1 }}>
                  This section is currently in progress.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowDevToast(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                padding: 4,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </>
      )}

      {/* Mobile overlay */}
      {open && (
        <div
          className="d-md-none"
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
            zIndex: 99,
          }}
        />
      )}

      <aside className={`sidebar${open ? ' open' : ''}`}>
        {/* Profile */}
        <div className="sidebar-profile">
          <LazyImage
            src={AVATAR}
            alt={profileName}
            className="sidebar-avatar"
            style={{ width: 42, height: 42, borderRadius: '50%', flexShrink: 0 }}
          />
          <div className="sidebar-profile-info">
            <div className="name">{profileName}</div>
            <div className="phone">+998 (99) 436-46-15</div>
          </div>
        </div>

        <div className="sidebar-section-label">MAIN MENU</div>

        <ul className="sidebar-nav">
          {navItems.map((item) => {
            const active = item.path === '/dashboard'; // Only dashboard is active
            return (
              <li key={item.path} className="sidebar-nav-item">
                <a
                  className={`sidebar-nav-link${active ? ' active' : ''}`}
                  onClick={() => handleLinkClick(item.path)}
                  role="button"
                >
                  <i className={`fas ${item.icon}`} />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
