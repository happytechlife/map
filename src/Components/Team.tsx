import * as React from 'react';
import { List, Divider, Card, CardContent, Typography, CardActions } from '@material-ui/core'
import { IHappyTechStore, ITeamMember } from '../models';
import * as md from './../Markdowns/team.md';
import { Markdown } from '../Utils/Pages/Markdown';
import { cloudinaryTransform } from '../Utils/Cloudinary';
import { snLinkedin, snTwitter, snFacebook } from '../Utils/socialNetworks';

interface IProps {
    store: IHappyTechStore
}

export class Team extends React.Component<IProps, {}> {


    public render() {
        const { store } = this.props;
        if (!store) {
            return null;
        }
        const { team } = store;
        const teamMembersByTeam = getTeamMembersByTeam(team);


        console.log(store);
        return <React.Fragment>
            <Markdown md={md}>
                <Divider style={{ margin: 24 }} />
                {Object.keys(teamMembersByTeam).map((key, i) => {
                    return <div style={{ width: '100%' }} key={i}>
                        <h2>{key}</h2>
                        <List style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>{teamMembersByTeam[key].map(teamMember)}</List >
                    </div>
                })}

            </Markdown>
        </React.Fragment>
    }
}

function getTeamMembersByTeam(tms: ITeamMember[]) {
    return tms.reduce((acc, v) => {
        if (!acc[v.team]) {
            acc[v.team] = [];
        }
        acc[v.team].push(v);
        return acc;
    }, {})
}

function teamMember(tm: ITeamMember) {
    return <Card key={tm.rowId} style={{ width: 288, margin: 8, display: 'flex', flexDirection: 'column' }} className="flexCenter">
        <CardContent>
            {tm.picture && <div className="flexCenter"><img src={cloudinaryTransform(tm.picture, 'w_96,r_max')} alt={tm.fullname} style={{ margin: 8 }} /></div>}
            <Typography gutterBottom={true} variant="headline" component="h2">{tm.fullname}</Typography>
            <Typography color="textSecondary">{tm.role}</Typography>
        </CardContent>
        <CardActions disableActionSpacing={true} style={{ display: 'flex' }}>
            {tm.linkedin && snLinkedin(tm.linkedin)}
            {tm.twitter && snTwitter(tm.twitter)}
            {tm.facebook && snFacebook(tm.facebook)}
        </CardActions>
    </Card>
}