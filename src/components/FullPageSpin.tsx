import { Spin } from 'antd';

export default function FullPageSpin() {
  return (
    <div style={{ padding: 16, textAlign: 'center', width: '100%' }}>
      <Spin size="large" />
    </div>
  );
}
