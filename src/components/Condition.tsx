import { Space } from 'antd';
import { green, red } from '@ant-design/colors';

import { CheckCircleIcon, XMarkCircleIcon } from './Icons';

export default function Condition({
  checked,
  text,
}: {
  checked: boolean;
  text: string;
}) {
  return (
    <Space>
      {checked ? (
        <CheckCircleIcon style={{ color: green[4] }} />
      ) : (
        <XMarkCircleIcon style={{ color: red[4] }} />
      )}
      {text}
    </Space>
  );
}
