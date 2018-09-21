import * as React from 'react';
import * as express from 'express';
import { renderToString } from 'react-dom/server';
// import Counter from '../containers/Counter';
import html from './html';
// import C1 from '../c1';
// import App from '../App';
// import { Startups } from '../Components/Startups';
// import { getStore } from '../Tables/Store';
// import { loadSpeadsheet } from '../Google/nodespreadsheets';
// import C1 from '../c1';
import { getStore } from '../Tables/Store';
import JssProvider from 'react-jss/lib/JssProvider';

// import { ApplicationRoutes } from '../Router/ApplicationRoutes';
import * as path from 'path';
import { SheetsRegistry } from 'jss';
import theme from '../theme';
import { createGenerateClassName, MuiThemeProvider } from '@material-ui/core';
import LeftDrawer from '../Components/LeftDrawer/LeftDrawer';
import { StaticRouter, Switch } from 'react-router';
import { renderRoutes } from '../Router/Routes';


const port = 9000;

(async () => {
    const server = express();

    server.use(express.static('build/client'));

    console.log('start loading store');
    const store = await getStore();

    server.get('*', async (req, res) => {

        const sheetsRegistry = new SheetsRegistry();
        const sheetsManager = new Map();
        const generateClassName = createGenerateClassName();

        // const body = renderToString(React.createElement(Startups, { store }));
        // const body = renderToString(React.createElement(ApplicationRoutes, { store }));
        const body = renderToString(
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                    <StaticRouter location={req.url} context={{}}>
                        <Switch>
                            <LeftDrawer>
                                {renderRoutes(store)}
                            </LeftDrawer>
                        </Switch>
                    </StaticRouter>
                </MuiThemeProvider>
            </JssProvider>
        );

        const css = sheetsRegistry.toString()

        res.send(
            html({
                title: 'happytech', store, body, css
            })
        );
    })

    server.listen(port, () => console.log(`Example app listening on port ${port}!`));
})();