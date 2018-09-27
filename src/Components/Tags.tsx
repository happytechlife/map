import * as React from 'react';
import List from '@material-ui/core/List'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import './Tags.css';
import { StartupTooltipText } from './Pin';
// import StartupCard from './StartupCard';
{/* <StartupCard startup={s} /> */ }
import Card from '@material-ui/core/Card';
import { IReactPageProps } from '../Utils/Pages/models';

export class Tags extends React.Component<IReactPageProps, {}> {
    public render() {
        const { store } = this.props;
        if (!store) {
            return null;
        }
        const { tags } = store;
        return <div className="Tags">
            {tags.map(tag => {
                return <Card key={tag.rowId} style={{ width: 300 }} className="Tag">
                    <Typography variant="headline">{tag.name}</Typography>
                    <List style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {tag.startups.map(s => <Tooltip placement="right" title={"ok"} key={s.rowId} ><StartupTooltipText startup={s} /></Tooltip>)}
                    </List >
                </Card>
            })}
        </div>;
    }
}
