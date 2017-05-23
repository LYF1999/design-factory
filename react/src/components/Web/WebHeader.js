import React from 'react';
import { observer } from 'mobx-react';
import { Card, Modal, Button } from 'antd';
import { Link } from 'react-router-dom';

import FavoriteCtrl from '../Favorite/FavoriteCtrl';
import Login from '../User/Login';
import Register from '../User/Register';

import Box from '../../components/Box';
import UserStore from '../../stores/UserStore';
import WebUiStore from '../../stores/WebUI';
import FavoriteCtrlStore from '../../stores/FavoriteCtrlStore';


const FavoriteCtrlModal = observer(({ close, visible }) => {

  const clickBox = ({ id, title, description }) => {
    WebUiStore.showMaterial({
      id,
      title,
      description
    })
  };

  const createBox = box => (
    <Box
      onClick={clickBox}
      key={box.id}
      box={box}
      imgSrc={box.cover}
      className="box"
      contentStyle={{ width: 160, height: 80 }}
      copyText={'12312312312'}
    />
  );
  return (
    <Modal
      visible={visible}
      title={FavoriteCtrlStore.favoriteCtrlDetail.name}
      onCancel={close}
      footer={[
        <Button size="large" onClick={close}>关闭</Button>
      ]}
    >
      {FavoriteCtrlStore.favoriteCtrlDetail.materials &&
      FavoriteCtrlStore.favoriteCtrlDetail.materials.map(createBox)}
    </Modal>
  );
});

@observer
class WebHeader extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  state = {
    visibleLogin: false,
    visibleRegister: false,
    visibleUser: false,
    showFavoriteCtrl: false,
  };

  onChooseFavoriteCtrl = ({ id }) => {
    WebUiStore.selectFavoriteCtrl = id;
    FavoriteCtrlStore.get(id);
    this.setState({
      showFavoriteCtrl: true,
      visibleUser: false,
    });
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

  closeFavoriteCtrlModal = () => {
    this.setState({
      showFavoriteCtrl: false,
    });
  };

  logout = () => {
    UserStore.logout();
    this.closeUserModal();
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
            <Button size="large" onClick={this.closeLoginModal}>关闭</Button>,
          ]}
        >
          <Login onComplete={this.closeLoginModal} />
        </Modal>
        <Modal
          visible={this.state.visibleRegister}
          title={'注册'}
          onCancel={this.closeRegisterModal}
          footer={[
            <Button size="large" onClick={this.closeRegisterModal}>关闭</Button>,
          ]}
        >
          <Register onComplete={this.closeRegisterModal} />
        </Modal>
        <Modal
          visible={this.state.visibleUser}
          title={'个人中心'}
          onCancel={this.closeUserModal}
          footer={[
            <Button size="large" onClick={this.logout}>注销</Button>,
            <Button size="large" onClick={this.closeUserModal}>关闭</Button>
          ]}
        >
          <Card title="个人信息" style={{ margin: 20 }}>
            <p className="text-center">您的用户名: {UserStore.user.username}</p>
            <p className="text-center">您的邮箱: {UserStore.user.email}</p>
          </Card>

          <FavoriteCtrl onClick={this.onChooseFavoriteCtrl} style={{ margin: 20 }} />
          <br />
          <br />
        </Modal>
        <FavoriteCtrlModal
          visible={this.state.showFavoriteCtrl}
          close={this.closeFavoriteCtrlModal}
        />
      </div>
    );
  }
}

export default WebHeader;
