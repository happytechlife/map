import * as React from 'react';
import { Switch, Router } from 'react-router';
import { IHappyTechStore } from "./../models";
// import { GoogleMap } from '../MapClusters/GoogleMap';
// import { Tags } from '../Components/Tags';
import LeftDrawer from '../Components/LeftDrawer/LeftDrawer';
import { CircularProgress } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import { renderRoutes } from './Routes';
// import { Startups } from '../Components/Startups';
// import { Options } from '../Components/Options';
// import { StartupsChordDiagramWithTags } from '../Components/StartupsChordDiagramWithTags';
// import StartupView from '../Components/StartupView';
// import { Presentation } from '../Utils/Pages/Presentation';

interface IState {
    store?: IHappyTechStore;
}
const history = createBrowserHistory();


interface IProps { store?: IHappyTechStore }
export class ApplicationRoutes extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        const { store } = props;
        this.state = { store };
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


    public render() {
        const { store } = this.state;
        return <Router history={history}>
            <Switch>
                <LeftDrawer >
                    {store && renderRoutes(store)}
                    {/* {this.renderLoader()} */}
                </LeftDrawer>
            </Switch>
        </Router>;
    }
    private async loadTables() {
        // const store = await getStore();
        // this.setState({ store });
    }
}

