import * as React from 'react';
import { List, Divider } from '@material-ui/core'
import { IHappyTechStore } from '../models';
import StartupCard from './StartupCard';
import './Startups.css';
import * as md from './../Markdowns/startups.md';
import { Markdown } from '../Utils/Pages/Markdown';
import { HappyTechTypeForm } from '../Utils/typeform';

interface IProps {
    store: IHappyTechStore
}



export class Startups extends React.Component<IProps, {}> {
    public render() {
        const { store } = this.props;
        if (!store) {
            return null;
        }
        const { startups } = store;
        return <React.Fragment>
            <Markdown md={md}>
                {HappyTechTypeForm('NCIVkm')}
                <Divider style={{ margin: 24 }} />
                <List style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>{startups.map(s => <StartupCard classNames="StartupCard" key={s.rowId} startup={s} />)}</List >
            </Markdown>
        </React.Fragment>
    }
}
