import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Link } from 'react-router-dom';

import { useAuth } from './hooks/use-auth';

import Page from '@/components/Page';

export default function RegisterPage() {
  const [form] = useForm();
  const { registerUser } = useAuth();

  const onFinish = async () => {
    const newUser = await form.getFieldsValue();
    registerUser(newUser);
    form.resetFields();
  };

  const validateEmail = (email: string) =>
    // https://emailregex.com/
    // eslint-disable-next-line
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    )
      ? true
      : false;

  return (
    <Page title="Opret bruger">
      <Row justify="center">
        <Col span={16}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Typography.Title level={3}>Opret bruger</Typography.Title>
            <Row justify="space-between" gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Fornavn"
                  name="firstName"
                  rules={[
                    { required: true, message: 'Fornavn er påkrævet' },
                    {
                      validator: (_, value: string) =>
                        /[^a-zæøåA-ZÆØÅ\-\s]+/.test(value)
                          ? Promise.reject(
                              new Error('Kun bogstaver er tilladte'),
                            )
                          : Promise.resolve(),
                    },
                    {
                      validator: (_, value: string) =>
                        value?.length > 32
                          ? Promise.reject(new Error('Maks. 32 tegn'))
                          : Promise.resolve(),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Efternavn"
                  name="lastName"
                  rules={[
                    { required: true, message: 'Efternavn er påkrævet' },
                    {
                      validator: (_, value: string) =>
                        /[^a-zæøåA-ZÆØÅ\-\s]+/.test(value)
                          ? Promise.reject(
                              new Error('Kun bogstaver er tilladte'),
                            )
                          : Promise.resolve(),
                    },
                    {
                      validator: (_, value: string) =>
                        value?.length > 32
                          ? Promise.reject(new Error('Maks. 32 tegn'))
                          : Promise.resolve(),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: 'E-mail er påkrævet' },
                {
                  validator: (_, value: string) =>
                    !validateEmail(value) && value?.length > 0
                      ? Promise.reject(
                          new Error('E-mailen er ikke i korrekt format'),
                        )
                      : Promise.resolve(),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Adgangskode"
              name="password"
              rules={[
                { required: true, message: 'Adgangskode er påkrævet' },
                {
                  validator: (_, value: string) =>
                    value?.length < 10 && value?.length > 0
                      ? Promise.reject(
                          new Error('Adgangskoden skal min. være 10 tegn'),
                        )
                      : Promise.resolve(),
                },
              ]}
            >
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
