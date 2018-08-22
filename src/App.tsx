import * as React from 'react';
import './App.css';
import { CircularProgress } from '@material-ui/core';
import { GoogleMap } from './MapClusters/GoogleMap';
import { Store, IHappyTechStore } from './Tables/Store';
import LeftDrawer from './Components/LeftDrawer/LeftDrawer';

interface IState {
  model?: IHappyTechStore;
}

class App extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    this.loadTables();
  }
  public loadTables = async () => {
    const store = new Store();
    await store.load();
    this.setState({ model: store.model });
  }

  public renderLoader() {
    const { model } = this.state;
    if (!model) {
      return <CircularProgress className="Loader" size={64} />
    }
    return null;
  }

  public render() {
    const { model } = this.state;
    return (
      <div className="App">
        {this.renderLoader()}
        <LeftDrawer store={model}>
          <GoogleMap store={model} />
        </LeftDrawer>
      </div>
    );
  }

}

export default App;

