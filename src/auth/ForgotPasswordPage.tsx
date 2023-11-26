import { Row, Col, Typography, Input, Space, Button, Form } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import { useSearchParams } from 'react-router-dom';

import { useAuth } from './hooks/useAuth';
import PasswordInput from './components/PasswordInput';

import Page from '@/components/Page';
import { mustEqual, required } from '@/lib/validation/forms/common';
import { emailFormat } from '@/lib/validation/forms/email';
import { notify } from '@/services/NotificationService';
import {
  passwordLength,
  passwordCommonNotAllowed,
} from '@/lib/validation/forms/password';

export default function ForgotPasswordPage() {
  const [form] = useForm();
  const { forgotPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const password = useWatch('password', form);

  const onSubmitForgotten = async () => {
    try {
      const fields = await form.getFieldsValue();
      await forgotPassword(fields);
      notify(
        'success',
        'E-mail sendt',
        'Kig i din e-mails indbakke (evt. spam), og klik på linket for at skifte adgangskode.',
      );
      form.resetFields();
    } catch (error: any) {
      if (error.problem === 'NETWORK_ERROR') {
        notify(
          'error',
          'Kunne ikke sende e-mail',
          'Der kunne ikke skabes forbindelse til serveren.',
        );
      } else {
        notify(
          'error',
          'Kunne ikke sende e-mail',
          'Tjek om e-mail adressen er skrevet korrekt.',
        );
      }
    }
  };

  // TODO - Will be implemented later
  const onNewPasswordSubmit = () => {};

  return (
    <Page title="Glemt adgangskode">
      <Row justify="center">
        <Col span={16}>
          {searchParams.get('token') ? (
            <Form form={form} onFinish={onNewPasswordSubmit} layout="vertical">
              <Typography.Title level={3}>Ny adgangskode</Typography.Title>
              <Form.Item
                label="Adgangskode"
                name="password"
                rules={[required, passwordLength, passwordCommonNotAllowed]}
              >
                <PasswordInput />
              </Form.Item>
              <Form.Item
                label="Gentag adgangskode"
                name="repeatPassword"
                dependencies={['password']}
                rules={[required, mustEqual(password)]}
              >
                <PasswordInput showStrength={false} />
              </Form.Item>
              <Form.Item>
                <Space size="middle" align="start">
                  <Button type="primary" size="large" htmlType="submit">
                    Send
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          ) : (
            <Form form={form} onFinish={onSubmitForgotten} layout="vertical">
              <Typography.Title level={3}>Glemt adgangskode</Typography.Title>
              <Form.Item>
                Har du glemt adgangskoden til din bruger? Indtast e-mail
                adressen i det nedenstående felt, og du vil modtage en e-mail
                med et link hvor du kan skifte adgangskode.
              </Form.Item>
              <Form.Item
                label="E-mail"
                name="email"
                rules={[required, emailFormat]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Space size="middle" align="start">
                  <Button type="primary" size="large" htmlType="submit">
                    Send
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          )}
        </Col>
      </Row>
    </Page>
  );
}
