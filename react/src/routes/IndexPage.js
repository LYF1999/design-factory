import React, { PropTypes } from 'react';
import { Link, Route } from 'react-router-dom';
import { Icon, Carousel, Button, Modal, message, Card } from 'antd';
import { observer } from 'mobx-react';

import LikeIcon from '../components/LikeIcon';

import MaterialsStore from '../stores/MaterialsStore';
import WebUIStore from '../stores/WebUI';
import ProgressPage from './ProgressPage';
import WebBoxList from '../components/Web/WebBoxList';
import WebHeader from '../components/Web/WebHeader';
import WebLayout from '../components/Web/WebLayout';
import './IndexPage.less';

@observer
class IndexPage extends ProgressPage {

  store = MaterialsStore;

  state = {
    chooseBoxId: null,
    modalContent: '',
    title: '',
    visible: false,
    visibleLogin: false,
    visibleRegister: false,
    visibleUser: false,
    selectBox: {},
  };

  static propTypes = {
    showCarousel: PropTypes.bool,
  };

  static defaultProps = {
    showCarousel: false,
  };

  componentDidMount() {
    super.componentDidMount();
    WebUIStore.showMaterial = this.onClickBox;
  }

  onClickBox = (box) => {
    const { id, title, description } = box;
    MaterialsStore.get(id);
    this.setState({
      chooseBoxId: id,
      title,
      modalContent: description,
      visible: true,
      selectBox: box,
    });
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
  };


  clickDisableFunc = () => {
    message.info('这个功能将在不久之后上线呢');
  };

  createFile = (file, index) => (
    <a key={file.id} rel="noreferrer noopener" target="_blank" href={file.file}>{`文件${index + 1}`}</a>
  );


  render() {
    return (
      <div>
        <div className="hidden-md-up index">
          <div style={{ backgroundColor: 'black', padding: '20px' }}>
            <h1 className="text-white mix-tmk big-font">
              THE WORKSHOP<br />
              OF DESIGN+
            </h1>
          </div>
          <div className="flex-center flex-stretch">
            <div
              onClick={this.clickDisableFunc}
              className="flex-equal-child"
              style={{ backgroundColor: '#FF9900', padding: '10px 0px', width: '33%' }}
            >
              <p style={{ fontSize: '25px' }} className="text-white text-center">
                TOP6
              </p>
            </div>
            <div
              className="flex-equal-child text-center"
              style={{ backgroundColor: '#FF3366', padding: '10px 0px', width: '33%' }}
            >
              <Link to="/user/">
                <div style={{ height: '100%' }} className="flex-center">
                  <Icon className="text-white" type="user" style={{ fontSize: '25px', fontWeight: 800 }} />
                </div>
              </Link>
            </div>
            <div
              onClick={this.clickDisableFunc}
              className="flex-equal-child"
              style={{ backgroundColor: '#6666FF', padding: '10px 0px', width: '33%' }}
            >
              <div style={{ height: '100%' }} className="flex-center">
                <Icon className="text-white" type="search" style={{ fontSize: '25px', fontWeight: 800 }} />
              </div>
            </div>
          </div>
          <div className="classes">
            <Link to="/design/font/">
              <div className="design-class">
                <p className="text-white menu-font">字体</p>
              </div>
            </Link>
            <Link to="/design/background/">
              <div className="design-class">
                <p className="text-white menu-font">背景</p>
              </div>
            </Link>
            <Link to="/design/image/">
              <div className="design-class">
                <p className="text-white menu-font">矢量素材</p>
              </div>
            </Link>
            <Link to="/design/layout/">
              <div className="design-class">
                <p className="text-white menu-font">版式欣赏</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="hidden-sm-down">
          <WebHeader />
          {this.props.showCarousel && (
            <div className="flex-center" style={{ paddingTop: 30 }}>
              <div style={{ width: 830, height: 330 }}>
                <Carousel autoplay effect="fade">
                  <div>
                    <img
                      alt="carousel-1"
                      className="img-responsive carousel-web"
                      src={require('../../public/carousel-1.jpg')}
                    />
                  </div>
                  <div>
                    <img
                      alt="carousel-2"
                      className="img-responsive carousel-web"
                      src={require('../../public/carousel-2.jpg')}
                    />
                  </div>
                </Carousel>
              </div>
            </div>
          )}
          <div className="find center-block" style={{ paddingTop: 30, maxWidth: 1200 }}>
            <h1 className="text-center" style={{ fontSize: 36 }}>发现素材</h1>
            <div style={{ width: 144, height: 6 }} className="center-block">
              <div style={{ display: 'inline-block', width: 36, height: '100%', backgroundColor: '#FFCC00' }} />
              <div style={{ display: 'inline-block', width: 36, height: '100%', backgroundColor: '#FF9933' }} />
              <div style={{ display: 'inline-block', width: 36, height: '100%', backgroundColor: '#FF3366' }} />
              <div style={{ display: 'inline-block', width: 36, height: '100%', backgroundColor: '#9900FF' }} />
            </div>
            <div className="flex-center" style={{ padding: '40px 100px' }}>
              <Link to="/design/font/">
                <div style={{ margin: 20, position: 'relative' }}>
                  <img
                    alt="font"
                    className="img-responsive web-big-img"
                    src={require('../../public/big-font.jpg')}
                  />
                  <p style={{ margin: 0, padding: 0 }} className="absolute-center text-white font-36">字体</p>
                </div>
              </Link>
              <Link to="/design/background/">
                <div style={{ margin: 20, position: 'relative' }}>
                  <img
                    alt="background"
                    className="img-responsive web-big-img"
                    src={require('../../public/big-background.jpg')}
                  />
                  <p style={{ margin: 0, padding: 0 }} className="absolute-center text-white font-36">背景</p>
                </div>
              </Link>
              <Link to="/design/image/">
                <div style={{ margin: 20, position: 'relative' }}>
                  <img
                    alt="tupian"
                    className="img-responsive web-big-img"
                    src={require('../../public/big-image.jpg')}
                  />
                  <p style={{ margin: 0, padding: 0 }} className="absolute-center text-white font-36">矢量</p>
                </div>
              </Link>
              <Link to="/design/layout/">
                <div style={{ margin: 20, position: 'relative' }}>
                  <img
                    alt="layout"
                    className="img-responsive web-big-img"
                    src={require('../../public/big-layout.jpg')}
                  />
                  <p style={{ margin: 0, padding: 0 }} className="absolute-center text-white font-36">排版</p>
                </div>
              </Link>
            </div>
          </div>


          <div style={{ maxWidth: 1200 }} className="center-block">

            <div style={{ display: 'nine' }}>
              {JSON.stringify(this.store.image.count)}
              {JSON.stringify(this.store.font.count)}
              {JSON.stringify(this.store.background.count)}
              {JSON.stringify(this.store.layout.count)}
            </div>

            <Route
              exact
              path="/"
              render={() => (
                <div
                  className="center-block"
                  style={{ width: 800, height: 1, backgroundColor: '#2e2e2e', margin: '30px auto' }}
                />)}
            />

            <Route
              exact
              path="/"
              render={() => (
                <div style={{ paddingTop: 30 }}>
                  <div style={{ width: 60, height: 36, display: 'inline-block', verticalAlign: 'text-bottom' }}>
                    <div style={{ display: 'inline-block', width: 15, height: '100%', backgroundColor: '#FFCC00' }} />
                    <div style={{ display: 'inline-block', width: 15, height: '100%', backgroundColor: '#FF9933' }} />
                    <div style={{ display: 'inline-block', width: 15, height: '100%', backgroundColor: '#FF3366' }} />
                    <div style={{ display: 'inline-block', width: 15, height: '100%', backgroundColor: '#9900FF' }} />
                  </div>
                  <span style={{ fontSize: 36, marginLeft: 15 }}>最受欢迎</span>
                </div>
              )}
            />

            <Route
              exact
              path="/"
              render={() => (
                <WebBoxList
                  loading={this.store.font.loading}
                  onClick={this.onClickBox}
                  title="字体"
                  boxList={this.store.font.data && this.store.font.data.results}
                />)}
            />

            <Route
              exact
              path="/"
              render={() => (
                <WebBoxList
                  loading={this.store.background.loading}
                  onClick={this.onClickBox}
                  title="背景"
                  boxList={this.store.background.data && this.store.background.data.results}
                />)}
            />
            <Route
              exact
              path="/"
              render={() => (
                <WebBoxList
                  loading={this.store.image.loading}
                  onClick={this.onClickBox}
                  title="矢量"
                  boxList={this.store.image.data && this.store.image.data.results}
                />)}
            />

            <Route
              path="/design/font"
              render={() => (
                <WebBoxList
                  loading={this.store.font.loading}
                  onClick={this.onClickBox}
                  title="字体"
                  boxList={this.store.font.data && this.store.font.data.results}
                />)}
            />
            <Route
              path="/design/background"
              render={() => (
                <WebBoxList
                  loading={this.store.background.loading}
                  onClick={this.onClickBox}
                  title="背景"
                  boxList={this.store.background.data && this.store.background.data.results}
                />)}
            />
            <Route
              path="/design/image"
              render={() => (
                <WebBoxList
                  loading={this.store.image.loading}
                  onClick={this.onClickBox}
                  title="矢量"
                  boxList={this.store.image.data && this.store.image.data.results}
                />)}
            />

            <Route
              path="/design/layout"
              render={() => (
                <WebLayout
                  loading={this.store.layout.loading}
                  onClick={this.onClickBox}
                  boxList={this.store.layout.data && this.store.layout.data.results}
                />)}
            />

          </div>
        </div>
        <Modal
          style={{ width: '80%', height: '80%' }}
          visible={this.state.visible}
          title={this.state.title}
          onCancel={this.closeModal}
          footer={[
            <Button key="back" size="large" onClick={this.closeModal}>关闭</Button>,
          ]}
        >
          <p
            className="text-center text-primary"
            style={{ margin: '20px 30px' }}
          >
            喜欢的话就赶快收藏吧！<LikeIcon style={{ float: 'none' }} id={this.state.chooseBoxId} />
          </p>
          <div className="html-content" dangerouslySetInnerHTML={{ __html: this.state.modalContent }} />

          <Card title="下载区域">
            {this.state.selectBox.files &&
            this.state.selectBox.files.map(this.createFile)}
          </Card>
        </Modal>
      </div>
    );
  }
}

export default IndexPage;
