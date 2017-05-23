import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Clipboard from 'clipboard';
import { Card, Icon } from 'antd';
import LazyLoad from 'react-lazy-load';
import LikeIcon from './LikeIcon';

@observer
class Box extends React.Component {

  static propTypes = {
    // tags: PropTypes.array,
    // likeCount: PropTypes.number.isRequired,
    // onLike: PropTypes.func,
    imgSrc: PropTypes.string,
    copyText: PropTypes.string,
    onDownload: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    box: PropTypes.object,
  };

  static defaultProps = {
    tags: [],
    likeCount: 0,
    box: {},
  };

  state = {
    lazyLoadHeight: 100,
    lazyLoadWidth: 160,
  };

  componentWillUnmount() {
    if (this.cliboard) this.cliboard.destroy();
  }

  bindCopyBtn = (btn) => {
    const self = this;
    if (!btn) return;
    this.cliboard = new Clipboard(btn, {
      text() {
        return self.props.copyText;
      },
    });
  };

  createFuncBtn = () => {
    if (this.props.onDownload) {
      return (
        <Icon onClick={this.props.onDownload} type="download" />
      );
    } else if (this.props.copyText) {
      return (
        <span style={{ margin: 5 }} ref={this.bindCopyBtn} className="pull-right anticon anticon-copy big-icon" />
      );
    }
    return null;
  };

  onClick = () => {
    this.props.onClick(this.props.box);
  };

  onLoad = () => {
    this.setState({
      lazyLoadWidth: 'auto',
      lazyLoadHeight: 'auto',
    });
  };


  render() {
    return (
      <Card
        onClick={this.onClick}
        style={this.props.style}
        className={this.props.className}
        bodyStyle={{ padding: 0 }}
      >
        <div className="custom-image" style={{ overflow: 'hidden' }}>
          <div style={this.props.contentStyle}>
            <LazyLoad
              height={this.state.lazyLoadHeight}
              width={this.state.lazyLoadWidth}
              offsetVertical={200}
              onContentVisible={this.onLoad}
            >
              <img alt="example" className="img-responsive" src={this.props.imgSrc} />
            </LazyLoad>
          </div>
        </div>
        <div className="custom-card" style={{ padding: '0 5px' }}>
          {/*{this.createFuncBtn()}*/}
          <LikeIcon id={this.props.box.id} />
        </div>
      </Card>
    );
  }
}

export default Box;
