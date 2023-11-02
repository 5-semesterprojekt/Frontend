import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Page from '../components/Page';
import { Link } from 'react-router-dom';
import { mainApi } from '../lib/api';
import { organizationConfig } from '../../config/organization';

export default function LoginPage() {
  const [form] = useForm();

  const onFinish = async () => {
    const results = await form.getFieldsValue();
    const response = await mainApi.post(`/users/${organizationConfig.id}/login`, results);

    console.log(response);

    form.resetFields();
  };

  return (
    <Page title="Log ind">
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
