import React, { useRef, type KeyboardEvent, type ClipboardEvent } from 'react';
import theme from '../../theme';

interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (val: string[]) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, value, onChange }) => {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const focusNext = (index: number) => {
    if (index < length - 1) inputs.current[index + 1]?.focus();
  };

  const focusPrev = (index: number) => {
    if (index > 0) inputs.current[index - 1]?.focus();
  };

  const handleChange = (index: number, digit: string) => {
    if (!/^\d?$/.test(digit)) return;
    const updated = [...value];
    updated[index] = digit;
    onChange(updated);
    if (digit) focusNext(index);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index]) focusPrev(index);
    if (e.key === 'ArrowLeft') focusPrev(index);
    if (e.key === 'ArrowRight') focusNext(index);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    const updated = Array(length).fill('');
    pasted.split('').forEach((ch, i) => (updated[i] = ch));
    onChange(updated);
    const lastFilled = Math.min(pasted.length, length - 1);
    inputs.current[lastFilled]?.focus();
  };

  return (
    <div className="otp-container">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="otp-box"
          value={value[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          style={{
            borderColor: value[i] ? theme.colors.primary : theme.colors.otpBoxBorder,
          }}
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
};

export default OtpInput;
