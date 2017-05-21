import React, { PropTypes } from 'react';
import Loading from '../Loading';
import UserStore from '../../stores/UserStore';

class Logout extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  componentWillMount() {
    UserStore.logout().then(() => {
      this.props.history.push('/');
    })
  }

  render() {
    return (
      <Loading />
    );
  }
}

export default Logout;
