import React from 'react';
import { Card } from 'antd';
import { observer } from 'mobx-react';
import LiekIcon from '../components/LikeIcon';
import { Route } from 'react-router-dom';
import ProgressPage from './ProgressPage';
import MobileHeader from '../components/Mobile/MobileHeader';
import { staticUrl } from '../App';
import MaterialsStore from '../stores/MaterialsStore';
import IndexPage from './IndexPage';
import Box from '../components/Box';
import './DesignPage.less';


@observer
class DesignPage extends ProgressPage {

  static propTypes = {};
  static defaultProps = {};

  state = {
    backgroundImage: '',
    title: '',
  };

  generalType = ['font', 'background', 'image'];

  componentWillMount() {
    super.componentWillMount();
    this.updateHeader(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateHeader(props);
  }

  updateHeader = () => {
    let backgroundImage;
    let title;
    const designClass = this.props.match.params.class;
    switch (designClass) {
      case 'font':
        backgroundImage = `${staticUrl}/font.jpg`;
        title = '字体';
        break;
      case 'background':
        backgroundImage = `${staticUrl}/background.jpg`;
        title = '背景';
        break;
      case 'image':
        backgroundImage = `${staticUrl}/image.jpg`;
        title = '矢量图';
        break;

      case 'layout':
        title = '版式欣赏';
        backgroundImage = `${staticUrl}/layout.jpg`;
        break;
      default:
        break;
    }

    this.setState({
      title,
      backgroundImage,
    });
  };

  onClick = ({ id }) => {
    this.props.history.push(`/design/detail/${id}/`);
  };

  createBox = (box) => (
    <Box
      onClick={this.onClick}
      box={box}
      imgSrc={box.cover}
      className="box"
      contentStyle={{ width: 160, height: 100 }}
      copyText={'12312312312'}
    />
  );

  createLayout = (layout) => (
    <div
      onClick={() => {
        this.onClick({ id: layout.id });
      }}
    >
      <Card>
        <img alt={layout.title} style={{ borderRadius: 10 }} src={layout.cover} className="img-responsive" />
        <div>
          <LiekIcon id={layout.id} />
        </div>
      </Card>
    </div>
  );

  createContent = () => {
    const type = this.props.match.params.class;
    if (this.generalType.indexOf(type) !== -1) {
      return (
        <div>
          {MaterialsStore[type].data && (
            MaterialsStore[type].data.results.map(this.createBox)
          )}
        </div>
      );
    } else if (type === 'layout') {
      return (
        <div style={{ padding: '40px 30px' }}>
          {MaterialsStore.layout.data && MaterialsStore.layout.data.results.map(this.createLayout)}
        </div>
      );
    }
  };


  render() {
    return (
      <div>
        <div className="design-page hidden-md-up">
          <MobileHeader title={this.state.title} backgroundImage={this.state.backgroundImage} />
          <div className="flex-between-warp">
            {this.createContent()}
          </div>
        </div>
        <div className="hidden-sm-down">
          <Route component={IndexPage} />
        </div>
      </div>
    );
  }
}

export default DesignPage;
