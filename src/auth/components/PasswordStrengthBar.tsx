import { blue, green, lime, orange, red, volcano } from '@ant-design/colors';
import { Popover, Progress, Row, Space } from 'antd';

import Condition from '@/components/Condition';
import { InformationIcon } from '@/components/Icons';
import { maxPasswordLength } from '@/lib/validation/password';

export default function PasswordStrengthBar({
  password,
}: {
  password: string;
}) {
  const measurement = PasswordToStrength(password);

  return (
    <>
      <Progress
        style={{ margin: 0 }}
        strokeColor={measurement.color}
        percent={measurement.strength}
        showInfo={false}
      />
      <Row justify="space-between">
        <span style={{ color: measurement.color }}>{measurement.message}</span>
        <Popover
          content={
            <Space direction="vertical">
              <b>Forslag til en bedre adgangskode</b>
              <Condition
                checked={ContainsLowerCase(password)}
                text="Små bogstaver"
              />
              <Condition
                checked={ContainsUpperCase(password)}
                text="Min. et stort bogstaver"
              />
              <Condition
                checked={ContainsNumbers(password)}
                text="Min. et tal"
              />
              <Condition
                checked={ContainsSymbols(password)}
                text="Min. et symbol"
              />
            </Space>
          }
        >
          <span style={{ color: blue[4] }}>
            <InformationIcon />
          </span>
        </Popover>
      </Row>
    </>
  );
}

function ContainsLowerCase(value: string): boolean {
  return value.match(/[a-z]+/) ? true : false;
}

function ContainsUpperCase(value: string): boolean {
  return value.match(/[A-Z]+/) ? true : false;
}

function ContainsNumbers(value: string): boolean {
  return value.match(/[0-9]+/) ? true : false;
}

function ContainsSymbols(value: string): boolean {
  return value.match(/^(?=.*[!@#$%^&*-])+/) ? true : false;
}

function PasswordToStrength(password: string): {
  color: string;
  message: string;
  strength: number;
} {
  let multiplier = 1;

  if (ContainsLowerCase(password)) multiplier += 2;
  if (ContainsUpperCase(password)) multiplier += 2;
  if (ContainsNumbers(password)) multiplier += 2;
  if (ContainsSymbols(password)) multiplier += 2;

  let color;
  let message;

  const strength =
    multiplier *
    (((password.length * password.length) / maxPasswordLength) * 4);

  if (strength < 20) {
    color = red[7];
    message = 'Meget svag';
  } else if (strength < 40) {
    color = volcano[4];
    message = 'Svag';
  } else if (strength < 60) {
    color = orange[5];
    message = 'Mellem';
  } else if (strength < 80) {
    color = lime[4];
    message = 'Stærk';
  } else {
    color = green[4];
    message = 'Meget stærk';
  }

  return {
    color,
    message,
    strength,
  };
}
