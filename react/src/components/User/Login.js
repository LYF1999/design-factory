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
        request('/api/auth/login/', {
          ...postOptions,
          body: JSON.stringify(values),
        })
          .then(({ err: error }) => {
            if (!error) {
              message.success('登陆成功');
              UserStore.fetch();
              this.props.onComplete();
            } else {
              message.error('账号或者密码错误');
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

        <Button type="primary" htmlType="submit" className="login-form-button">
          登陆
        </Button>
      </Form>
    );
  }
}

export default Form.create()(Login);
