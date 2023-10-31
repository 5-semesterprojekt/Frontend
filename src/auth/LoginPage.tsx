import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';

function LoginPage() {
  const [form] = useForm();

  const onFinish = () => {
    form.resetFields();
  };

  return (
    <Row justify="center">
      <Col span={16}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Typography.Title level={3}>Log ind</Typography.Title>
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
      </Col>
    </Row>
  );
}

export default LoginPage;
