import * as React from 'react';
import { Paper, Typography } from '@material-ui/core';
import './base.css';
import { IHappyTechStore } from '../../models';
import './md.css';
import { getHtml } from './pages';
import { IPage } from './models';
import { helmet } from '../Helmet';

export class Text extends React.Component<{}, {}> {
    public render() {
        return <Typography style={{ margin: 16 }}>{this.props.children}</Typography >
    }
}

// const presentationUrl = 'https://drive.google.com/file/d/163bsd9JvadDh3YlxbeW2GUr5Wu0kiPUs/view';

interface IProps {
    store?: IHappyTechStore;
    html?: string;
    md?: { default: string };
    page?: IPage;
}
export class Markdown extends React.Component<IProps, {}> {

    get html() {
        const { html, md } = this.props;
        return html || (md ? getHtml(md) : '<div>no_content</div>');
    }

    public render() {
        const { html } = this;
        const { page, store } = this.props;
        return <Paper className="md-container main-paper">
            {page && helmet(page, store)}
            <div className="md" dangerouslySetInnerHTML={{ __html: html }} />
            <div className="md-children" style={{ width: '100%' }}>{this.props.children}</div>
        </Paper >
    }
}
