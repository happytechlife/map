import * as React from 'react';
import { Route } from 'react-router';
import { IHappyTechStore } from "./../models";
import { Startups } from '../Components/Startups';
import { Tags } from '../Components/Tags';
import StartupView from '../Components/StartupView';
import { Markdown } from '../Utils/Pages/Markdown';
import { pages } from '../Utils/Pages/pages';

interface IParams {
    match: {
        params: {
            name: string;
        }
    }
}

function markdownPages(store?: IHappyTechStore) {
    return Object.keys(pages).map(name => {
        const page = pages[name];
        return <Route key={page.route} exact={true} path={`/${page.route}`} component={() => <Markdown html={page.html} store={store} />} />
    })
}
export const renderRoutes = (store?: IHappyTechStore) => {
    return <React.Fragment>
        {/* <Route exact={true} path={'/map'} component={() => <GoogleMap store={store} />} /> */}
        {store && <React.Fragment>
            <Route exact={true} path={'/tags'} component={() => <Tags store={store} />} />
            <Route exact={true} path={'/startups'} component={() => <Startups store={store} />} />
            <Route exact={true} path={'/startups/:name'} component={(p: IParams) => <StartupView store={store} name={p.match.params.name} />} />
        </React.Fragment>}
        {/* <Route exact={true} path={'/options'} component={() => <Options store={store} />} /> */}
        {/* <Route exact={true} path={'/startups_chord'} component={() => <StartupsChordDiagramWithTags store={store} />} /> */}
        {/* <Route exact={true} path={'/presentation'} component={() => <Presentation store={store} />} /> */}
        {markdownPages(store)}
        <Route exact={true} path={'/'} component={() => <Markdown html={pages.presentation.html} store={store} />} />

    </React.Fragment>
}