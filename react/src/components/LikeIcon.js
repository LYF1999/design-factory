import React from 'react';
import { observer } from 'mobx-react';
import { Icon } from 'antd';
import WebUIStore from '../stores/WebUI';
import FavoriteObjectStore from '../stores/FavoriteObjectStore';


const LikeIcon = ({ id, style, onClick }) => {
  const onLick = (e) => {
    WebUIStore.showAddModal(id);
    e.stopPropagation();
  };

  const newStyle = {
    margin: 5,
    ...style,
  };

  const onCancelLike = () => {
    FavoriteObjectStore.del({ id });
  };

  if (id in FavoriteObjectStore.allFavoriteObject) {
    return (
      <Icon onClick={onCancelLike} style={newStyle} type="star" className="pull-right big-icon" />
    );
  }
  return (
    <Icon style={newStyle} onClick={onLick} type="star-o" className="pull-right big-icon" />
  );
};

export default observer(LikeIcon);
