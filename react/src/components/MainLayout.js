import React from 'react';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import { DEV } from '../App';
import IndexPage from '../routes/IndexPage';
import DesignPage from '../routes/DesignPage';
import LoginPage from '../routes/LoginPage';
import Logout from './User/Logout';
import RegisterPage from '../routes/RegisterPage';
import UserStore from '../stores/UserStore';
import UserPage from '../routes/User';
import MaterialsStore from '../stores/MaterialsStore';

@observer
class MainLayout extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  componentWillMount() {
    UserStore.fetch();
    MaterialsStore.fetch('font');
    MaterialsStore.fetch('background');
    MaterialsStore.fetch('image');
    MaterialsStore.fetch('layout');
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <IndexPage showCarousel />} />
          <Route path="/design/:class" component={DesignPage} />
          <Route path="/user/login" component={LoginPage} />
          <Route path="/user/register" component={RegisterPage} />
          <Route path="/user/logout" component={Logout} />
          <Route path="/user/" component={UserPage} />
        </Switch>
        {DEV && (<DevTools />)}
      </div>
    );
  }
}

export default MainLayout;
