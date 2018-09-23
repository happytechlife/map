import * as React from 'react';
import { Paper, Typography } from '@material-ui/core';
import './base.css';
import { IHappyTechStore } from '../../models';
import './md.css';
import { getHtml } from './pages';

export class Text extends React.Component<{}, {}> {
    public render() {
        return <Typography style={{ margin: 16 }}>{this.props.children}</Typography >
    }
}

// const presentationUrl = 'https://drive.google.com/file/d/163bsd9JvadDh3YlxbeW2GUr5Wu0kiPUs/view';

interface IProps {
    store?: IHappyTechStore;
    html?: string;
    md?: string;
}
export class Markdown extends React.Component<IProps, {}> {

    get html() {
        const { html, md } = this.props;
        return html || (md ? getHtml(md) : '<div>no_content</div>');
    }
    public render() {
        const { html } = this;

        return < Paper className="md-container main-paper">
            <div className="md" dangerouslySetInnerHTML={{ __html: html }} />
            <div className="md-children" style={{ width: '100%' }}>{this.props.children}</div>
        </Paper >
    }
}
