import React, { PropTypes } from 'react';
import { Col, Row } from 'antd';

import Loading from '../Loading';

import Box from '../Box';

class WebLayout extends React.Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    boxList: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    boxList: [],
  };

  state = {
    array1: [],
    array2: [],
    array3: [],
    array4: [],
  };

  componentWillMount() {
    let index = 0;
    for (const box of this.props.boxList) {
      const remainder = index % 4;
      this.setState((preState) => {
        return {
          [`array${remainder + 1}`]: [...preState[`array${remainder + 1}`], box],
        };
      });
      index += 1;
    }
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.boxList !== nextProps.boxList) {
      let index = 0;
      for (const box of nextProps.boxList) {
        const remainder = index % 4;
        this.setState((preState) => {
          return {
            [`array${remainder + 1}`]: [...preState[`array${remainder + 1}`], box],
          };
        });
        index += 1;
      }
    }
  }

  createBox = (box) => (
    <Box
      key={box.id}
      className="box"
      contentStyle={{ width: '100%', height: 'auto' }}
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
        <span style={{ fontSize: 28, marginLeft: 10 }}>排版</span>
        {
          this.props.loading ? (
            <Loading />
          ) : (
            <div style={{ paddingTop: 20 }}>
              <Row>
                <Col span={6}>
                  {this.state.array1.map(this.createBox)}
                </Col>
                <Col span={6}>
                  {this.state.array2.map(this.createBox)}
                </Col>
                <Col span={6}>
                  {this.state.array3.map(this.createBox)}
                </Col>
                <Col span={6}>
                  {this.state.array4.map(this.createBox)}
                </Col>
              </Row>
            </div>
          )
        }
      </div>
    );
  }
}

export default WebLayout;
