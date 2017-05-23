import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';


import request from '../../utils/request';
import { postOptions } from '../../utils/fetchOptions';

import UserStore from '../../stores/UserStore';

const FormItem = Form.Item;

class Login extends React.Component {

  static propTypes = {
    onComplete: PropTypes.func,
  };
  static defaultProps = {};

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        request('/api/auth/registration/', {
          ...postOptions(),
          body: JSON.stringify(values),
        })
          .then(({ err: error }) => {
            if (!error) {
              message.success('注册成功');
              this.props.onComplete();
              UserStore.fetch();
            } else {
              const detail = error.detail;
              message.error(detail[Object.keys(detail)[0]]);
            }
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form style={this.props.style} onSubmit={this.handleSubmit} className={`login-form ${this.props.className}`}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入您的用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入您的邮箱' }],
          })(
            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm_password', {
            rules: [{ required: true, message: '请确认您的密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>

        <Button type="primary" htmlType="submit" className="login-form-button">
          注册
        </Button>
      </Form>
    );
  }
}

export default Form.create()(Login);
