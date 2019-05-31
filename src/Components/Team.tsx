import * as React from 'react';
import { List, Divider, Card, CardContent, Typography, CardActions } from '@material-ui/core'
import { ITeamMember } from '../models';
import * as md from './../Markdowns/team.md';
import { Markdown } from '../Utils/Pages/Markdown';
import { cloudinaryTransform } from '../Utils/Cloudinary';
import { snLinkedin, snTwitter, snFacebook } from '../Utils/socialNetworks';
import { groupListByProperty } from '../Utils/misc';
import { IReactPageProps, IReactPage } from '../Utils/Pages/models';
import { helmet } from '../Utils/Helmet';
import People from '@material-ui/icons/People';
import { getHeaders } from '../Utils/Pages/pages';



export class Team extends React.Component<IReactPageProps, {}> {

    public render() {
        const { store, page } = this.props;
        if (!store) {
            return null;
        }
        const { team } = store;
        const teamMembersByTeam = getTeamMembersByTeam(team);

        return <React.Fragment>
            {page && helmet(page, store)}
            <Markdown md={md}>
                <Divider style={{ margin: 24 }} />
                {Object.keys(teamMembersByTeam).map((key, i) => {
                    return <div style={{ width: '100%' }} key={i}>
                        <Typography variant="h4" className="title">{key}</Typography>
                        <List style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>{teamMembersByTeam[key].map(teamMember)}</List >
                    </div>
                })}
            </Markdown>
        </React.Fragment>
    }
}

function getTeamMembersByTeam(tms: ITeamMember[]) {
    return groupListByProperty<ITeamMember>(tms, 'team');
}

function teamMember(tm: ITeamMember) {
    return <Card key={tm.rowId} style={{ width: 288, margin: 8, display: 'flex', flexDirection: 'column' }} className="flexCenter">
        <CardContent>
            {tm.picture && <div className="flexCenter"><img src={cloudinaryTransform(tm.picture, 'w_96,r_max,f_png')} alt={tm.fullname} style={{ margin: 8 }} /></div>}
            <Typography gutterBottom={true} variant="subtitle1" component="h2">{tm.fullname}</Typography>
            <Typography variant="subtitle2">{tm.role}</Typography>
        </CardContent>
        <CardActions style={{ display: 'flex' }}>
            {tm.linkedin && snLinkedin(tm.linkedin)}
            {tm.twitter && snTwitter(tm.twitter)}
            {tm.facebook && snFacebook(tm.facebook)}
        </CardActions>
    </Card>
}

export const teamPage = (): IReactPage => ({
    menuTitle: 'L\'équipe',
    route: 'team',
    icon: People,
    component: Team,
    headers: () => getHeaders(`L'équipe HappyTech`)
})
