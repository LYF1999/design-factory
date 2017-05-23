import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Card, Icon, Button, Input, message } from 'antd';

import FavoriteCtrlStore from '../../stores/FavoriteCtrlStore';

@observer
class FavoriteCtrl extends React.Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };
  static defaultProps = {};

  state = {
    startNew: false,
    newFavoriteCtrlName: '',
  };

  onClickNew = () => {
    this.setState({
      startNew: true,
    });
  };

  onChangeName = (e) => {
    this.setState({
      newFavoriteCtrlName: e.target.value,
    });
  };

  onConfirm = () => {
    const name = this.state.newFavoriteCtrlName.trim();
    if (name) {
      FavoriteCtrlStore.post({
        body: JSON.stringify({ name }),
      });
      this.setState({
        startNew: false,
      });
    } else {
      message.error('请输入收藏夹名称');
    }
  };


  createFavoriteCtrl = favoriteCtrl => (
    <div key={favoriteCtrl.id} className="col-xs-10 col-xs-offset-1">
      <div
        onClick={() => {
          this.props.onClick(favoriteCtrl);
        }}
        style={{ cursor: 'pointer' }}
      >
        <span style={{ font: 14 }}><Icon style={{ fontSize: 36 }} type="folder" /></span>
        <span className="text-primary" style={{ margin: 15 }}>{favoriteCtrl.name}</span>
      </div>
    </div>
  );

  render() {
    return (
      <Card style={this.props.style} title="收藏夹">
        {FavoriteCtrlStore.favoriteCtrlSet &&
        FavoriteCtrlStore.favoriteCtrlSet.map(this.createFavoriteCtrl)}

        <br />
        <br />
        <div className="flex-center">
          {this.state.startNew ? (
            <span>
              <Input
                placeholder="请输入收藏夹的名称"
                value={this.state.newFavoriteCtrlName}
                onChange={this.onChangeName}
              />
              <div className="flex-center" style={{ marginTop: 15 }}>
                <Button
                  onClick={this.onConfirm}
                  type="primary"
                >
                  确认
                </Button>
              </div>
            </span>
          ) : (
            <Button type="primary" onClick={this.onClickNew}>新建收藏夹</Button>
          )}
        </div>
      </Card>
    );
  }
}

export default FavoriteCtrl;
