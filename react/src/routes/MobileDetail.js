import React, { PropTypes } from 'react';
import { Icon, Card } from 'antd';
import { observer } from 'mobx-react';
import LikeIcon from '../components/LikeIcon';
import Loading from '../components/Loading';
import MaterialsStore from '../stores/MaterialsStore';


@observer
class WapDetail extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  componentWillMount() {
    MaterialsStore.get(this.props.match.params.id);
  }

  goBack = () => {
    this.props.history.goBack();
  };


  createFile = (file, index) => (
    <a rel="noreferrer noopener" target="_blank" href={file.file}>{`文件${index + 1}`}</a>
  );

  render() {
    return (
      <div style={{ paddingTop: 10, paddingLeft: 10 }}>
        <Icon onClick={this.goBack} type="left" style={{ fontSize: '30px' }} />
        <Card title={MaterialsStore.selected.title} style={{ margin: 15, padding: '30px 20px' }}>
          <p className="title text-white">{this.props.title}</p>
          {MaterialsStore.selected.loading ? (
            <Loading />
          ) : (
            <div>
              <p style={{ margin: 15 }} className="text-center text-primary">
                很喜欢？赶快收藏吧!
                <LikeIcon style={{ marginLeft: 10, float: 'none' }} id={MaterialsStore.selected.id} />
              </p>
              <div className="html-content" dangerouslySetInnerHTML={{ __html: MaterialsStore.selected.description }} />
            </div>
          )}
        </Card>
        <Card title="下载区域" style={{ margin: 15, padding: '30px 20px' }}>
          {MaterialsStore.selected.files &&
          MaterialsStore.selected.files.map(this.createFile)}
        </Card>
      </div>
    );
  }
}

export default WapDetail;
