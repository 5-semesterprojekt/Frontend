import { Spin } from 'antd';

export default function FullPageSpin() {
  return (
    <div
      style={{
        padding: 16,
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Spin size="large" />
    </div>
  );
}
