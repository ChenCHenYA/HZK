import React, { Component } from 'react';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import Router from './router'

import 'antd-mobile/dist/antd-mobile.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Button>Start</Button>

        </div>
      </Router>

    );
  }
}

export default App;
