import React from 'react';

import { withStyles } from 'material-ui/styles';

const style = {

};

class DollDetailInfoBox extends React.Component {
  render() {
    return (
      <div style={{ ...this.props.pos, height: '1000px' }} >
        으앙앙
      </div>
    );
  }
}

export default withStyles(style)(DollDetailInfoBox);
