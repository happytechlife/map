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
import { Startups } from '../Components/Startups';
import LeftDrawer from '../Components/LeftDrawer/LeftDrawer';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
const port = 9000;

(async () => {
    const server = express();

    const staticPath = path.join(__dirname, 'build');
    console.log('staticPath', staticPath);
    server.use(express.static('build'));

    console.log('start loading store');
    const store = await getStore();

    server.get('/', async (req, res) => {

        const sheetsRegistry = new SheetsRegistry();
        const sheetsManager = new Map();
        const generateClassName = createGenerateClassName();

        // const body = renderToString(React.createElement(Startups, { store }));
        // const body = renderToString(React.createElement(ApplicationRoutes, { store }));
        const body = renderToString(
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                    <Router history={createMemoryHistory()}>
                        <LeftDrawer >
                            {store && <Startups store={store} />}
                            {/* {this.renderLoader()} */}
                        </LeftDrawer>
                    </Router>
                </MuiThemeProvider>
            </JssProvider>
        );
        const css = sheetsRegistry.toString()


        res.send(
            html({
                body, css
            })
        );
    })

    server.listen(port, () => console.log(`Example app listening on port ${port}!`));
})();
