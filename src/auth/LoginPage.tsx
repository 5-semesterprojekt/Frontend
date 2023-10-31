import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

function LoginPage() {
  const [form] = useForm();

  const onFinish = () => {
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="E-mail" name="email" required>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" required>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log ind
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginPage;
