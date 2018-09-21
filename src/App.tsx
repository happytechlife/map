import * as React from 'react';
import './App.css';
import { ApplicationRoutes } from './Router/ApplicationRoutes';
import { MuiThemeProvider, jssPreset } from '@material-ui/core';
import theme from './theme';
import * as cj from 'circular-json';
import { IHappyTechStore } from './models';
import { JssProvider, createGenerateClassName } from 'react-jss';
import { create } from 'jss';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());


declare let window: any;
const gStore = window.GlobalStore;
class App extends React.Component<{}, { store?: IHappyTechStore }> {


  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    // const jssStyles = document.getElementById('jss-server-side');
    // if (jssStyles && jssStyles.parentNode) {
    //   jssStyles.parentNode.removeChild(jssStyles);
    // }
    // if (!gStore) {
    //   getStore().then(store => {
    //     this.setState({ store });
    //   });
    // }
  }

  public render() {
    let { store } = this.state;
    store = gStore ? cj.parse(gStore) : store;
    return <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        {/* <div className="App"> */}
        <ApplicationRoutes store={store} />
        {/* </div> */}
      </MuiThemeProvider>
    </JssProvider>;
  }

}

export default App;

