import * as React from 'react';
import { List } from '@material-ui/core'
import { IHappyTechStore } from '../Tables/Store';
import StartupCard from './StartupCard';
import './StartupCard';
interface IProps {
    store: IHappyTechStore
}

export class Startups extends React.Component<IProps, {}> {
    public render() {
        console.log(this.props);
        const { store } = this.props;
        if (!store) {
            return null;
        }
        const { startups } = store;
        return <List style={{ display: 'flex', flexWrap: 'wrap' }}>{startups.map(s => <StartupCard classNames="StartupCard" key={s.rowId} startup={s} />)}</List >;
    }
}
