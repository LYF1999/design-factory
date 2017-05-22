import React from 'react';
import { Icon } from 'antd';

class Loading extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div className="loading-div" style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Icon className="absolute-center" style={{ fontSize: 40 }} type="loading" />
      </div>
    );
  }
}

export default Loading;
