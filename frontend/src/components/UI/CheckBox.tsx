import React from 'react';

/**
 * Props for the Checkbox component
 * @interface CheckboxProps
 * @property {string} id - Unique identifier for the checkbox
 * @property {boolean} checked - Current checked state of the checkbox
 * @property {(checked: boolean) => void} onChange - Callback function when checkbox state changes
 * @property {boolean} [disabled] - Whether the checkbox is disabled
 */
interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

/**
 * A reusable checkbox component with customizable styles
 * @component
 * @param {CheckboxProps} props - The component props
 * @returns {JSX.Element} A styled checkbox input element
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled}
      style={{
        width: '16px',
        height: '16px',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    />
  );
};
