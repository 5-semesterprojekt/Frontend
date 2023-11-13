import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Link } from 'react-router-dom';

import { useAuth } from './hooks/use-auth';

import Page from '@/components/Page';

export default function LoginPage() {
  const [form] = useForm();
  const { signInUser } = useAuth();

  const onFinish = async () => {
    const credentials = await form.getFieldsValue();
    signInUser(credentials);
    form.resetFields();
  };

  return (
    <Page title="Log ind">
      <Row justify="center">
        <Col span={16}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Typography.Title level={3}>Log ind</Typography.Title>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[{ required: true, message: 'E-mail er påkrævet' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Adgangskode er påkrævet' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Space size="middle" align="start">
                <Button type="primary" size="large" htmlType="submit">
                  Log ind
                </Button>
                <span>
                  <Link to="/registrer">Opret bruger</Link>
                  <br />
                  <Link to="/">Glemt adgangskode</Link>
                </span>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Page>
  );
}
