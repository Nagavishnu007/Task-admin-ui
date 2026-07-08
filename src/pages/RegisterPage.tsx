import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthCard from '../components/AuthCard/AuthCard';
import theme from '../theme';
import { RegisterSchema, type RegisterInput } from '../schema';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    document.title = 'Register | Admin Panel';
    return () => { document.title = 'Admin Panel'; };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterInput) => {
    setLoading(true);
    setSubmitError('');

    // Generate a 6-digit verification code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in LocalStorage
    localStorage.setItem(
      'registeredUser',
      JSON.stringify({ email: data.email, password: data.password })
    );

    setTimeout(() => {
      setLoading(false);
      // Navigate to OTP page, passing generatedOtp and email in the navigation state
      navigate('/otp', { state: { email: data.email, otp: generatedOtp } });
    }, 900);
  };

  return (
    <AuthCard>
      <div className="page-enter">
        <h1 className="auth-title">Register to Admin Panel</h1>
        <p className="auth-subtitle">Enter your details below to create an account</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label-custom" htmlFor="reg-email">
              <i className="fas fa-envelope me-1" style={{ color: theme.colors.textMuted, fontSize: '0.65rem' }} />
              EMAIL ID
            </label>
            <input
              id="reg-email"
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
          <div className="mb-3" style={{ position: 'relative' }}>
            <label className="form-label-custom" htmlFor="reg-password">
              <i className="fas fa-lock me-1" style={{ color: theme.colors.textMuted, fontSize: '0.65rem' }} />
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="reg-password"
                type={showPwd ? 'text' : 'password'}
                className="form-control-custom"
                placeholder="Enter your password"
                {...register('password')}
                autoComplete="new-password"
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

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label-custom" htmlFor="reg-confirm">
              <i className="fas fa-shield-alt me-1" style={{ color: theme.colors.textMuted, fontSize: '0.65rem' }} />
              CONFIRM PASSWORD
            </label>
            <input
              id="reg-confirm"
              type={showPwd ? 'text' : 'password'}
              className="form-control-custom"
              placeholder="Enter your confirm password"
              {...register('confirmPassword')}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <div style={{ color: theme.colors.danger, fontSize: '0.78rem', marginTop: 4 }}>
                <i className="fas fa-exclamation-circle me-1" />
                {errors.confirmPassword.message}
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
            id="register-submit-btn"
          >
            {loading ? (
              <>
                <i className="fas fa-circle-notch fa-spin me-2" />
                Registering...
              </>
            ) : (
              <>Register</>
            )}
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            Login
          </a>
        </p>
      </div>
    </AuthCard>
  );
};

export default RegisterPage;
