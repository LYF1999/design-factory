import React from 'react';
import { observer } from 'mobx-react';

import Box from '../components/Box';
import { staticUrl } from '../App';
import ProgressPage from './ProgressPage';
import FavoriteCtrlStore from '../stores/FavoriteCtrlStore';
import MobileHeader from '../components/Mobile/MobileHeader';


@observer
class MobileFavoriteCtrl extends ProgressPage {

  static propTypes = {};
  static defaultProps = {};


  componentWillMount() {
    FavoriteCtrlStore.get(this.props.match.params.id);
  }

  onClick = ({ id }) => {
    this.props.history.push(`/design/detail/${id}/`);
  };

  createBox = box => (
    <Box
      key={box.id}
      onClick={this.onClick}
      box={box}
      imgSrc={box.cover}
      className="box"
      contentStyle={{ width: 160, height: 80 }}
      copyText={'12312312312'}
    />
  );

  render() {
    return (
      <div className="design-page hidden-md-up">
        <div style={{ display: 'none' }}>
          {JSON.stringify(FavoriteCtrlStore.favoriteCtrlDetail)}
          {console.log(FavoriteCtrlStore.favoriteCtrlDetail)}
        </div>
        <MobileHeader
          title={FavoriteCtrlStore.favoriteCtrlDetail.name}
          backgroundImage={`${staticUrl}/favorite.jpg`}
        />
        <div className="flex-between-warp">
          {FavoriteCtrlStore.favoriteCtrlDetail.materials &&
          FavoriteCtrlStore.favoriteCtrlDetail.materials.map(this.createBox)}
        </div>
      </div>
    );
  }
}

export default MobileFavoriteCtrl;
