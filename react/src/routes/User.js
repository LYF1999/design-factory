import React, { PropTypes } from 'react';
import { Card, Button } from 'antd';
import { observer } from 'mobx-react';
import { staticUrl } from '../App';
import UserStore from '../stores/UserStore';
import MobileHeader from '../components/Mobile/MobileHeader';
import { requireLogin } from '../utils/decprators';

@requireLogin
@observer
class User extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  logout = () => {
    UserStore.logout();
  };

  render() {
    return (
      <div>
        <MobileHeader title="个人中心" backgroundImage={`${staticUrl}/user.jpg`} />
        <Card style={{ margin: 20 }}>
          <p className="text-center">您的用户名: {UserStore.user.username}</p>
          <p className="text-center">您的邮箱: {UserStore.user.email}</p>
          <br />
          <br />
          <div className="flex-center">
            <Button className="center-block" size="large" onClick={this.logout}>注销</Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default observer(User);
