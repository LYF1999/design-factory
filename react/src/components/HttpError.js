import React, { PropTypes } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class HttpError extends React.Component {

  static propTypes = {
    status: PropTypes.number,
    detail: PropTypes.string,
  };
  static defaultProps = {
    status: 404,
  };

  render() {
    return (
      <div>
        <p className="text-center" style={{ fontSize: 100 }}>{this.props.status}</p>
        <p className="text-center" style={{ fontSize: 40 }}>{this.props.detail || '不好意思，出错啦'}</p>

        <Link to="/"><Button size="large" className="center-block">返回首页</Button></Link>
      </div>
    );
  }
}

export default HttpError;
