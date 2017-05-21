import React from 'react';
import { Card, Modal, Button } from 'antd';
import { Link } from 'react-router-dom';

import Login from '../User/Login';
import Register from '../User/Register';

import UserStore from '../../stores/UserStore';


class WebHeader extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  state = {
    visibleLogin: false,
    visibleRegister: false,
    visibleUser: false,
  };

  closeLoginModal = () => {
    this.setState({
      visibleLogin: false,
    });
  };
  closeRegisterModal = () => {
    this.setState({
      visibleRegister: false,
    });
  };
  closeUserModal = () => {
    this.setState({
      visibleUser: false,
    });
  };

  showLoginModal = () => {
    this.setState({
      visibleLogin: true,
    });
  };
  showRegisterModal = () => {
    this.setState({
      visibleRegister: true,
    });
  };
  showUserModal = () => {
    this.setState({
      visibleUser: true,
    });
  };

  render() {
    return (
      <div style={{ height: 100, backgroundColor: '#000', position: 'relative' }} className="flex-center">
        <Link to="/">
          <h1 className="text-white mix-tmk big-font text-center">
            THE WORKSHOP OF DESIGN+
          </h1>
        </Link>
        {
          UserStore.user.auth ? (
            <img
              onClick={this.showUserModal}
              alt="avatar"
              className="avatar absolute-vertical-center"
              style={{ right: 60 }}
              src={require('../../../public/avatar.png')}
            />
          ) : (
            <div className="absolute-vertical-center" style={{ right: 60 }}>
              <ul className="clearfix">
                <li
                  onClick={this.showLoginModal}
                  className="text-white"
                  style={{ float: 'left', fontSize: 24, marginRight: 10, cursor: 'pointer' }}
                >
                  登陆
                </li>
                <li
                  onClick={this.showRegisterModal}
                  className="text-white"
                  style={{ float: 'left', fontSize: 24, marginRight: 10, cursor: 'pointer' }}
                >
                  注册
                </li>
              </ul>
            </div>
          )
        }
        <Modal
          visible={this.state.visibleLogin}
          title={'登陆'}
          onCancel={this.closeLoginModal}
          footer={[
            <Button key="back" size="large" onClick={this.closeLoginModal}>关闭</Button>,
          ]}
        >
          <Login />
        </Modal>
        <Modal
          visible={this.state.visibleRegister}
          title={'注册'}
          onCancel={this.closeRegisterModal}
          footer={[
            <Button key="back" size="large" onClick={this.closeRegisterModal}>关闭</Button>,
          ]}
        >
          <Register />
        </Modal>
        <Modal
          visible={this.state.visibleUser}
          title={'个人信息'}
          onCancel={this.closeUserModal}
          footer={[
            <Button key="back" size="large" onClick={this.closeUserModal}>关闭</Button>,
          ]}
        >
          <Card style={{ margin: 20 }}>
            <p className="text-center">您的用户名: {UserStore.user.username}</p>
            <p className="text-center">您的邮箱: {UserStore.user.email}</p>
          </Card>
        </Modal>
      </div>
    );
  }
}

export default WebHeader;
