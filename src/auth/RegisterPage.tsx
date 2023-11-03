import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Link } from 'react-router-dom';

import Page from '../components/Page';

export default function RegisterPage() {
  const [form] = useForm();

  const onFinish = () => {
    form.resetFields();
  };

  return (
    <Page title="Opret bruger">
      <Row justify="center">
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
              <Space align="start">
                <Button type="primary" size="large" htmlType="submit">
                  Opret
                </Button>
                <Link to="/log-ind">Har du allerede en bruger?</Link>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Page>
  );
}
