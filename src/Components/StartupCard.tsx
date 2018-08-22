import * as React from 'react';
import { cloudinaryTransform } from '../Utils/Cloudinary';
import { IStartup } from '../models';
// import './Pin.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles: any = (theme: any) => ({
    card: {
        display: 'flex',
        // height: 152,
        margin: theme.spacing.unit,
        padding: theme.spacing.unit
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
        height: 151,
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
}

class StartupCard extends React.Component<IProps, {}> {
    public render() {
        const { startup, classes } = this.props;
        const logo = cloudinaryTransform(startup.iconUrl, 'w_151,h_151,c_fill,g_west');
        return <Card className={classes.card}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="headline">{startup.name}</Typography>
                </CardContent>
                <Typography variant="caption" align="left">{startup.contacts.map(c => c.firstname).join(', ')}</Typography>
                <Typography variant="caption" align="left" >{startup.address}</Typography>
            </div>
            {logo && <CardMedia
                className={classes.cover}
                image={logo}
                title={startup.name}
            />}
        </Card>;
    }

}

export default withStyles(styles, { withTheme: true })(StartupCard);
