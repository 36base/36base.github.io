import React from 'react';
import Menu from 'ui/Menu/Menu';

import './style/App.css';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      content: '메인입니당!!!',
    };
  }

  render() {
    return (
      <div className="wrapper">
        <Menu />
        <div>
          {this.state.content}
        </div>
      </div>
    );
  }
}
