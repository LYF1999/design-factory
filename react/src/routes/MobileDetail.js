import React, { PropTypes } from 'react';
import { Icon, Card } from 'antd';
import { observer } from 'mobx-react';
import Loading from '../components/Loading';
import MaterialsStore from '../stores/MaterialsStore';


@observer
class WapDetail extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  goBack = () => {
    this.props.history.goBack();
  };

  componentWillMount() {
    MaterialsStore.get(this.props.match.params.id);
  }

  render() {
    return (
      <div style={{ paddingTop: 15 }}>
        <Icon onClick={this.goBack} type="left" style={{ fontSize: '30px' }} />
        <Card title={MaterialsStore.selected.title} style={{ margin: 15, padding: '30px 20px' }}>
          <p className="title text-white">{this.props.title}</p>
          {MaterialsStore.selected.loading ? (
            <Loading />
          ) : (
            <div className="html-content" dangerouslySetInnerHTML={{ __html: MaterialsStore.selected.description }} />
          )}
        </Card>
      </div>
    );
  }
}

export default WapDetail;
