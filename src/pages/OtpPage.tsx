import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthCard from '../components/AuthCard/AuthCard';
import OtpInput from '../components/OtpInput/OtpInput';
import theme from '../theme';

const OtpPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve OTP and email from navigation state; fallback for direct navigation/testing
  const receivedState = location.state as { email?: string; otp?: string } | null;
  const testOtp = receivedState?.otp || '582910';

  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Verify OTP | Admin Panel';
    return () => { document.title = 'Admin Panel'; };
  }, []);

  const isFilled = otp.every((d) => d !== '');

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFilled) return;

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const enteredOtp = otp.join('');
      if (enteredOtp === testOtp) {
        // Success
        navigate('/dashboard');
      } else {
        setError('Incorrect verification code. Please try again.');
      }
    }, 900);
  };

  const handleResend = () => {
    setOtp(Array(6).fill(''));
    setError('');
    setResent(true);
    // Keep toast visible or show it again on resend
    setShowToast(true);
    setTimeout(() => setResent(false), 3000);
  };

  const handleAutoFill = () => {
    if (testOtp) {
      setOtp(testOtp.split(''));
      setError('');
    }
  };

  return (
    <AuthCard>
      {/* Toast Notification Container */}
      {showToast && (
        <>
          <style>{`
            @keyframes slideDown {
              from { transform: translate(-50%, -20px); opacity: 0; }
              to { transform: translate(-50%, 0); opacity: 1; }
            }
            .premium-toast {
              animation: slideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}</style>
          <div
            className="premium-toast"
            style={{
              position: 'fixed',
              top: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              width: '90%',
              maxWidth: 420,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(74, 114, 255, 0.25)',
              boxShadow: '0 10px 30px rgba(74, 114, 255, 0.15)',
              borderRadius: 12,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
            role="alert"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(74, 114, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.colors.primary,
                  flexShrink: 0,
                }}
              >
                <i className="fas fa-key" style={{ fontSize: '0.9rem' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: theme.colors.textPrimary }}>
                  Verification Code
                </div>
                <div style={{ fontSize: '0.78rem', color: theme.colors.textMuted, marginTop: 1 }}>
                  Use code <strong style={{ color: theme.colors.primary, fontSize: '0.85rem' }}>{testOtp}</strong> to verify.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                type="button"
                onClick={handleAutoFill}
                style={{
                  background: theme.colors.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.15)')}
                onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
              >
                Auto-fill
              </button>
              <button
                type="button"
                onClick={() => setShowToast(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: theme.colors.textMuted,
                  cursor: 'pointer',
                  padding: 4,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Dismiss notification"
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
        </>
      )}

      <div className="page-enter" style={{ textAlign: 'center' }}>
        {/* Lock icon */}
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: '#f0f4ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <i className="fas fa-envelope-open-text" style={{ fontSize: '1.4rem', color: theme.colors.secondary }} />
        </div>

        <h1 className="auth-title" style={{ textAlign: 'center' }}>Verify your email</h1>
        <p className="auth-subtitle" style={{ textAlign: 'center', marginBottom: 28 }}>
          Enter the OTP sent to {receivedState?.email || 'your registered email id'}
        </p>

        <form onSubmit={handleProceed} style={{ textAlign: 'left' }}>
          <OtpInput value={otp} onChange={setOtp} length={6} />

          {resent && (
            <div
              style={{
                background: '#f0fff4',
                border: '1px solid #bbf7d0',
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: '0.82rem',
                color: theme.colors.success,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <i className="fas fa-check-circle" />
              OTP resent successfully!
            </div>
          )}

          {error && (
            <div
              style={{
                background: '#fff0f0',
                border: '1px solid #fecaca',
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: '0.82rem',
                color: theme.colors.danger,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <i className="fas fa-exclamation-circle" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-auth"
            disabled={!isFilled || loading}
            id="otp-proceed-btn"
            style={{ opacity: isFilled ? 1 : 0.6, cursor: isFilled ? 'pointer' : 'not-allowed' }}
          >
            {loading ? (
              <>
                <i className="fas fa-circle-notch fa-spin me-2" />
                Verifying...
              </>
            ) : (
              <>Proceed</>
            )}
          </button>
        </form>

        <p className="auth-footer-text" style={{ marginTop: 16 }}>
          Didn't receive the code?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleResend();
            }}
            style={{ color: theme.colors.secondary }}
          >
            Resend OTP
          </a>
        </p>
      </div>
    </AuthCard>
  );
};

export default OtpPage;
