import * as React from 'react';
import { List, Typography } from '@material-ui/core'
import { IHappyTechStore } from '../Tables/Store';
import './Tags.css';
import { StartupTooltipText } from './Pin';
import { Tooltip } from '@material-ui/core';
// import StartupCard from './StartupCard';
{/* <StartupCard startup={s} /> */ }
import { Card } from '@material-ui/core';
interface IProps {
    store: IHappyTechStore
}

export class Tags extends React.Component<IProps, {}> {
    public render() {
        console.log(this.props);
        const { store } = this.props;
        if (!store) {
            return null;
        }
        const { tags } = store;

        return <div className="Tags">
            {tags.map(tag => {
                return <Card key={tag.rowId} style={{ width: 320 }} className="Tag">
                    <Typography variant="headline">{tag.name}</Typography>
                    <List style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {tag.startups.map(s => <Tooltip placement="right" title={"ok"} key={s.rowId} ><StartupTooltipText startup={s} /></Tooltip>)}
                    </List >
                </Card>
            })}
        </div>;
    }
}
