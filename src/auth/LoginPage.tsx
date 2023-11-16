import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Link } from 'react-router-dom';

import { useAuth } from './hooks/use-auth';

import Page from '@/components/Page';
import { notify } from '@/services/NotificationService';
import { required } from '@/lib/validation/common';

export default function LoginPage() {
  const [form] = useForm();
  const { signInUser } = useAuth();

  const onFinish = async () => {
    try {
      const credentials = await form.getFieldsValue();
      await signInUser(credentials);
      notify('success', 'Logget ind');
      form.resetFields();
    } catch (error: any) {
      if (error.problem === 'NETWORK_ERROR') {
        notify(
          'error',
          'Kunne ikke logge ind',
          'Der kunne ikke skabes forbindelse til serveren.',
        );
      } else {
        notify(
          'error',
          'Kunne ikke logge ind',
          'Tjek om dine loginoplysninger er skrevet korrekt.',
        );
      }
    }
  };

  return (
    <Page title="Log ind">
      <Row justify="center">
        <Col span={16}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Typography.Title level={3}>Log ind</Typography.Title>
            <Form.Item label="E-mail" name="email" rules={[required]}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[required]}>
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
