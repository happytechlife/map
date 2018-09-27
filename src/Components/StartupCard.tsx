import * as React from 'react';
import { cloudinaryTransform } from '../Utils/Cloudinary';
import { IStartup, IContact } from '../models';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Chip, List, Button, Avatar, CardActions } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles: any = (theme: any) => ({
    card: {
        display: 'flex',
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
        maxWidth: 280,
        width: 280,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1'
    },
    content: {
        flex: '1 0 auto',
        alignItems: 'left'
    },
    cover: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

interface IProps {
    startup: IStartup;
    classes: any;
    classNames?: string;
}

export const Contact = (contact: IContact) => {
    return <Chip key={contact.rowId}
        avatar={contact.photo ? <Avatar src={cloudinaryTransform(contact.photo, 'w_32,h_32,c_fit')} /> : undefined}
        label={`${contact.firstname} ${contact.lastname}`} />
}

class StartupCard extends React.Component<IProps, {}> {
    public render() {
        const { startup, classes, classNames } = this.props;
        const logo = cloudinaryTransform(startup.iconUrl, 'w_300,h_168,c_pad,f_png');
        return <Card className={`${classes.card} ${classNames}`}>
            <div className={classes.details} id={startup.name}>
                {logo && <CardMedia
                    className={classes.cover}
                    image={logo}
                    title={startup.name}
                />}
                <CardContent className={classes.content}>
                    <Typography gutterBottom={true} variant="headline" component="h2">
                        {startup.name}
                    </Typography>
                    <Typography variant="caption" align="center" >{startup.description}</Typography>
                    {/* <Typography variant="caption" align="left" ></Typography> */}
                    <List>{startup.tags.map((t, i) => <Chip key={i} label={t.name} style={{ margin: 2 }} />)}</List>
                    <Typography variant="caption" align="center" >{startup.address}</Typography>
                    <List>{startup.contacts.map(Contact)}</List>
                </CardContent>
                <CardActions>
                    <Link style={{ textDecoration: 'none' }} to={startupLink(startup)}><Button variant="raised">Voir</Button></Link>
                </CardActions>
            </div>
        </Card>;
    }

}

export default withStyles(styles, { withTheme: true })(StartupCard);


export const startupLink = (startup: IStartup) => `/startups/${startupLinkName(startup)}`;
export const startupLinkName = (startup: IStartup) => startup.name.toLocaleLowerCase().replace(/ /g, '-');