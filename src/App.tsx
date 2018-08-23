import * as React from 'react';
import './App.css';
import { ApplicationRoutes } from './Router/ApplicationRoutes';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';

class App extends React.Component<{}, {}> {

  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">

          <ApplicationRoutes />
        </div>
      </MuiThemeProvider>
    );
  }

}

export default App;

