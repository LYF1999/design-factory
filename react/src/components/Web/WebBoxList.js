import React, { PropTypes } from 'react';
import Box from '../Box';

class WebBoxList extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    boxList: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  static defaultProps = {
    boxList: [],
  };


  createBox = (box) => (
    <Box
      key={box.id}
      className="box"
      contentStyle={{ width: 200, height: 100 }}
      onClick={this.props.onClick}
      imgSrc={box.cover}
      box={box}
    />
  );

  render() {
    return (
      <div style={{ padding: '20px 60px' }}>
        <div
          style={{
            display: 'inline-block',
            width: 10,
            height: 30,
            backgroundColor: '#0033FF',
            verticalAlign: 'text-bottom',
          }}
        />
        <span style={{ fontSize: 28, marginLeft: 10 }}>{this.props.title}</span>
        <div
          style={{
            paddingTop: 20,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {this.props.boxList.map(this.createBox)}
        </div>
      </div>
    );
  }
}

export default WebBoxList;
