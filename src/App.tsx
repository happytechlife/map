import * as React from 'react';
import './App.css';
import { IStartup, IContact } from './models';
import { CircularProgress } from '@material-ui/core';
import { GoogleMap } from './MapClusters/GoogleMap';
import { Store } from './HappyTechTables/Store';

interface IState {
  startups?: IStartup[];
  contacts?: IContact[];
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
    this.setState(store.model);
  }

  public renderLoader() {
    const { startups } = this.state;
    if (!startups) {
      return <CircularProgress className="Loader" size={64} />
    }
    return null;
  }

  public render() {
    const { startups, contacts } = this.state;
    return (
      <div className="App">
        {this.renderLoader()}
        <GoogleMap startups={startups} contacts={contacts} />
      </div>
    );
  }

}

export default App;

