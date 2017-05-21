import React from 'react';

class ProgressPage extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  componentWillMount() {
    NProgress.start();
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    return (
      null
    );
  }
}

export default ProgressPage;
