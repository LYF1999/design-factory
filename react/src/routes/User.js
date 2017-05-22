import React from 'react';
import { Card } from 'antd';
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

  render() {
    return (
      <div>
        <MobileHeader title="个人中心" backgroundImage={`${staticUrl}/user.jpg`} />
        <Card style={{ margin: 20 }}>
          <p className="text-center">您的用户名: {UserStore.user.username}</p>
          <p className="text-center">您的邮箱: {UserStore.user.email}</p>
        </Card>
      </div>
    );
  }
}

export default observer(User);
