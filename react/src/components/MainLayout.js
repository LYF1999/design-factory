import React from 'react';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import { Modal, Button, message } from 'antd';
import DevTools from 'mobx-react-devtools';
import { DEV } from '../App';
import WebUIStore from '../stores/WebUI';
import IndexPage from '../routes/IndexPage';
import DesignPage from '../routes/DesignPage';
import LoginPage from '../routes/LoginPage';
import WapDetail from '../routes/MobileDetail';
import Logout from './User/Logout';
import RegisterPage from '../routes/RegisterPage';
import UserStore from '../stores/UserStore';
import UserPage from '../routes/User';
import MaterialsStore from '../stores/MaterialsStore';
import FavoriteObjectStore from '../stores/FavoriteObjectStore';
import FavoriteCtrl from './Favorite/FavoriteCtrl';
import MobileFavoriteCtrl from '../routes/MobileFavoriteCtrl';

@observer
class MainLayout extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  state = {
    showModal: false,
  };


  componentWillMount() {
    UserStore.fetch();
    MaterialsStore.fetch('font');
    MaterialsStore.fetch('background');
    MaterialsStore.fetch('image');
    MaterialsStore.fetch('layout');
    FavoriteObjectStore.fetchAll();
  }

  componentDidMount() {
    WebUIStore.showAddModal = this.onStartAdd;
  }

  onStartAdd = (id) => {
    if (!UserStore.user.auth) {
      message.error('请先登陆');
      return;
    }
    WebUIStore.onFavoriteMaterial = id;
    this.setState({
      showModal: true,
    });
  };

  onClose = () => {
    this.setState({
      showModal: false,
    });
  };

  onAdd = ({ id }) => {
    FavoriteObjectStore.post({
      body: JSON.stringify({
        material_id: WebUIStore.onFavoriteMaterial,
        favorite_ctrl: id,
      }),
    });
  };


  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <IndexPage showCarousel />} />
          <Route path="/design/detail/:id" component={WapDetail} />
          <Route path="/favorite/:id" component={MobileFavoriteCtrl} />
          <Route path="/design/:class" component={DesignPage} />
          <Route path="/user/login" component={LoginPage} />
          <Route path="/user/register" component={RegisterPage} />
          <Route path="/user/logout" component={Logout} />
          <Route path="/user/" component={UserPage} />
        </Switch>

        <Modal
          visible={this.state.showModal}
          title="添加到您的收藏夹"
          onCancel={this.onClose}
          footer={[
            <Button size="large" onClick={this.onClose}>关闭</Button>,
          ]}
        >
          <FavoriteCtrl onClick={this.onAdd} />
        </Modal>
        {DEV && (<DevTools />)}
      </div>
    );
  }
}

export default MainLayout;
