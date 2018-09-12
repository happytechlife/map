import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { IHappyTechStore, getStore } from '../Tables/Store';
import { GoogleMap } from '../MapClusters/GoogleMap';
import { Tags } from '../Components/Tags';
import LeftDrawer from '../Components/LeftDrawer/LeftDrawer';
import { CircularProgress } from '@material-ui/core';
import { Startups } from '../Components/Startups';
import { Options } from '../Components/Options';
import { StartupsChordDiagramWithTags } from '../Components/StartupsChordDiagramWithTags';
import StartupView from '../Components/StartupView';
import { Presentation } from '../Utils/Pages/Presentation';

interface IState {
    store?: IHappyTechStore;
}
const history = createBrowserHistory();

interface IParams {
    match: {
        params: {
            name: string;
        }
    }
}
export class ApplicationRoutes extends React.Component<{}, IState> {

    constructor(props: {}) {
        super(props)
        this.state = {};
    }
    public componentDidMount() {
        this.loadTables();
    }
    public renderLoader() {
        const { store } = this.state;
        if (!store) {
            return <CircularProgress className="Loader" size={64} />
        }
        return null;
    }

    public renderRoutes(store: IHappyTechStore) {
        return <React.Fragment>
            <Route exact={true} path={'/map'} component={() => <GoogleMap store={store} />} />
            <Route exact={true} path={'/tags'} component={() => <Tags store={store} />} />
            <Route exact={true} path={'/startups'} component={() => <Startups store={store} />} />
            <Route exact={true} path={'/startups/:name'} component={(p: IParams) => <StartupView store={store} name={p.match.params.name} />} />
            <Route exact={true} path={'/options'} component={() => <Options store={store} />} />
            <Route exact={true} path={'/startups_chord'} component={() => <StartupsChordDiagramWithTags store={store} />} />
            <Route exact={true} path={'/presentation'} component={() => <Presentation store={store} />} />
            <Route exact={true} path={'/'} component={() => <Startups store={store} />} />
        </React.Fragment>
    }
    public render() {
        const { store } = this.state;
        return <Router history={history}>
            <Switch>
                <LeftDrawer >
                    {store && this.renderRoutes(store)}
                    {this.renderLoader()}
                </LeftDrawer>
            </Switch>
        </Router>;
    }
    private async loadTables() {
        const store = await getStore();
        this.setState({ store });
    }
}