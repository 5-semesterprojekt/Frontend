import { useState } from 'react';
import { Button } from 'antd';

function App() {
  const [count, setCount] = useState(0);

  const onChange = () => {
    setCount(count + 1);
  }

  return (
    <>
      <Button type='primary' onClick={onChange}>{count}</Button>
    </>
  );
}

export default App;
