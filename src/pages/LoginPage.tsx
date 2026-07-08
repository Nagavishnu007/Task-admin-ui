import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthCard from '../components/AuthCard/AuthCard';
import theme from '../theme';
import { LoginSchema, type LoginInput } from '../schema';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    document.title = 'Login | Admin Panel';
    return () => { document.title = 'Admin Panel'; };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginInput) => {
    setLoading(true);
    setSubmitError('');

    setTimeout(() => {
      setLoading(false);
      // Retrieve registeredUser from localStorage
      const storedUserRaw = localStorage.getItem('registeredUser');
      if (!storedUserRaw) {
        setSubmitError('No registered user found. Please register an account first.');
        return;
      }

      try {
        const storedUser = JSON.parse(storedUserRaw);
        if (storedUser.email === data.email && storedUser.password === data.password) {
          navigate('/dashboard');
        } else {
          setSubmitError('Invalid email or password.');
        }
      } catch (err) {
        setSubmitError('Failed to verify user credentials. Please try registering again.');
      }
    }, 900);
  };

  return (
    <AuthCard>
      <div className="page-enter">
        <h1 className="auth-title">Log In to Admin Panel</h1>
        <p className="auth-subtitle">Enter your email id and password below</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label-custom" htmlFor="login-email">
              <i className="fas fa-envelope me-1" style={{ color: theme.colors.textMuted, fontSize: '0.65rem' }} />
              EMAIL ID
            </label>
            <input
              id="login-email"
              type="email"
              className="form-control-custom"
              placeholder="Enter your email id"
              {...register('email')}
              autoComplete="email"
            />
            {errors.email && (
              <div style={{ color: theme.colors.danger, fontSize: '0.78rem', marginTop: 4 }}>
                <i className="fas fa-exclamation-circle me-1" />
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="mb-4" style={{ position: 'relative' }}>
            <label className="form-label-custom" htmlFor="login-password">
              <i className="fas fa-lock me-1" style={{ color: theme.colors.textMuted, fontSize: '0.65rem' }} />
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="login-password"
                type={showPwd ? 'text' : 'password'}
                className="form-control-custom"
                placeholder="Enter your password"
                {...register('password')}
                autoComplete="current-password"
                style={{ paddingRight: 42 }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                style={{
                  position: 'absolute', right: 12, top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none',
                  cursor: 'pointer', color: theme.colors.textMuted,
                  padding: 0, fontSize: '0.85rem',
                }}
                aria-label="Toggle password visibility"
              >
                <i className={`fas ${showPwd ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>
            {errors.password && (
              <div style={{ color: theme.colors.danger, fontSize: '0.78rem', marginTop: 4 }}>
                <i className="fas fa-exclamation-circle me-1" />
                {errors.password.message}
              </div>
            )}
          </div>

          {submitError && (
            <div
              className="mb-3"
              style={{
                background: '#fff0f0',
                border: '1px solid #fecaca',
                borderRadius: 8,
                padding: '10px 14px',
                fontSize: '0.82rem',
                color: theme.colors.danger,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <i className="fas fa-exclamation-circle" />
              {submitError}
            </div>
          )}

          <button
            type="submit"
            className="btn-auth"
            disabled={loading}
            id="login-submit-btn"
          >
            {loading ? (
              <>
                <i className="fas fa-circle-notch fa-spin me-2" />
                Logging in...
              </>
            ) : (
              <>Log In</>
            )}
          </button>
        </form>

        <p className="auth-footer-text">
          Don't have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}
          >
            Register
          </a>
        </p>
      </div>
    </AuthCard>
  );
};

export default LoginPage;
