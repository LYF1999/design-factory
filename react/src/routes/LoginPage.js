import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { DEV } from '../App';
import Login from '../components/User/Login';
import { noLogin } from '../utils/decprators';
import MobileHeader from '../components/Mobile/MobileHeader';


@noLogin
@observer
class LoginPage extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  render() {
    let staticUrl = '';
    if (!DEV) {
      staticUrl = '/static';
    }

    return (
      <div>
        <MobileHeader title="登陆" backgroundImage={`${staticUrl}/login.jpg`} />
        <div style={{ padding: '20px 30px' }}>
          <Login />
          <div style={{ paddingTop: 20, textAlign: 'center' }}>
            <Link to="/user/register">没有账号?点击这里注册</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default observer(LoginPage);
