import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';

function LoginPage() {
  const [form] = useForm();

  const onFinish = () => {
    form.resetFields();
  };

  return (
    <Row justify='center'>
      <Col span={16}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Typography.Title level={3}>Opret bruger</Typography.Title>
          <Row justify="space-between" gutter={16}>
            <Col span={12}>
              <Form.Item label="Fornavn" name="firstname" required>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Efternavn" name="lastname" required>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="E-mail" name="email" required>
            <Input />
          </Form.Item>
          <Form.Item label="Adgangskode" name="password" required>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Registér
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default LoginPage;
