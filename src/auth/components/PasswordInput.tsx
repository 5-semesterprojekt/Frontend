import { Input } from 'antd';

import PasswordStrengthBar from './PasswordStrengthBar';

export default function PasswordInput({
  value,
  onChange,
  showStrength = true,
}: {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  showStrength?: boolean;
}) {
  return (
    <>
      <Input.Password value={value} onChange={onChange} />
      {showStrength && value && value?.length > 0 && (
        <PasswordStrengthBar password={value || ''} />
      )}
    </>
  );
}
