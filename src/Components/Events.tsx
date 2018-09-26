import * as React from 'react';
import { IHappyTechStore, IEvent } from '../models';
import * as md from './../Markdowns/events.md';
import { Markdown } from '../Utils/Pages/Markdown';
import { cloudinaryTransform } from '../Utils/Cloudinary';
import { Card, CardContent, Typography, List, Divider, Button, withWidth } from '@material-ui/core';
import { groupListByMethod } from '../Utils/misc';
import { StartupChip } from './Pin';
import * as moment from 'moment';
import { ExternalLink } from '../Utils/ExternalLink';
import { WithWidthProps, isWidthDown } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

interface IProps {
    store: IHappyTechStore;
}



class Events extends React.Component<IProps & WithWidthProps, {}> {
    public render() {
        const { store, width } = this.props;
        if (!store) {
            return null;
        }
        console.log(width);
        const { events } = store;
        const eventsByDate = groupListByMethod<IEvent>(events, (ev) => {
            console.log(ev, moment(ev.date).format('MMMM YYYY'));
            if (!ev.date) {
                return { displayName: '<no-date>', key: '0000' };
            }
            const m = moment(ev.date);
            const displayName = m.format('MMMM YYYY');
            const key = m.format('YYYY-MM');
            return { key, displayName };
            // return ev.date ? moment(ev.date).format('MMMM YYYY') : '<no-date>';
        });
        console.log(eventsByDate);
        return <React.Fragment>
            <Markdown md={md}>
                {/* {HappyTechTypeForm('QFxtC9', "Remplir le formulaire d'adhésion entreprise")} */}
                <Divider style={{ margin: 24 }} />
                {Object.keys(eventsByDate).map((key, i) => {
                    const values = eventsByDate[key].list;
                    return <React.Fragment key={i}>
                        <h1 className="title">{eventsByDate[key].groupKey.displayName}</h1>
                        <List style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>{values.map(e => EventCard(e, width))}</List >
                    </React.Fragment>
                })}
            </Markdown>
        </React.Fragment>
    }
}
export default withWidth()(Events);

function EventCard(event: IEvent, width: Breakpoint) {
    const logo = cloudinaryTransform(event.logo, 'w_300,h_168,c_pad,f_png');
    const flexDirection = isWidthDown('sm', width) ? 'column' : 'row';
    const card = <Card key={event.rowId} style={{ width: '100%', margin: 8 }}>
        <div >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection }}>
                {logo && <img src={logo} style={{ width: 300 }} />}
                <div style={{ flexGrow: 1, flexDirection: 'column' }} className="flexCenter" >
                    <h2 className="flexCenter" style={{ margin: 4 }}>
                        {event.name}
                    </h2>
                    {event.date &&
                        <h4 className="flexCenter" style={{ flexGrow: 1, margin: 4 }}>
                            {moment(event.date).format('dddd, MMMM Do YYYY')} - {event.time}
                        </h4>}
                    <ExternalLink link={event.registerLink}><Button style={{ marginTop: 12 }} variant="raised">Inscrivez-vous</Button></ExternalLink>
                </div>
            </div>
            <CardContent >
                <Typography variant="body1" align="center" >{event.description}</Typography>
                {event.startups && <div>
                    <h3 className="title">Les startups présentes</h3>
                    <List>{event.startups.map(StartupChip)}</List>
                </div>}
            </CardContent>
        </div>
    </Card>;
    return card;
}