import React, { PropTypes } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import './MobileHeader.less';


class MobileHeader extends React.Component {

  static propTypes = {
    backgroundImage: PropTypes.string.isRequired,
    title: PropTypes.string,
  };
  static defaultProps = {};

  render() {
    return (
      <div className="mobile-header" style={{ backgroundImage: `url("${this.props.backgroundImage}")`, backgroundSize: 'auto 100%' }}>
        <Link to="/"><Icon className="text-white" type="left" style={{ fontSize: '30px' }} /></Link>
        <p className="title text-white">{this.props.title}</p>
        {this.props.children}
      </div>
    );
  }
}

export default MobileHeader;
