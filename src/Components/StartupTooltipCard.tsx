import * as React from 'react';
import { cloudinaryTransform } from '../Utils/Cloudinary';
import { IStartup } from '../models';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { List } from '@material-ui/core';
import { Contact } from './StartupCard';

const styles: any = (theme: any) => ({
    card: {
        display: 'flex',
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
        maxWidth: 200,
        width: 200,
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
    }
});

interface IProps {
    startup: IStartup;
    classes: any;
    classNames?: string;
}

class StartupTooltipCard extends React.Component<IProps, {}> {
    public render() {
        const { startup, classes, classNames } = this.props;
        const logo = cloudinaryTransform(startup.iconUrl, 'w_200,h_117,c_pad,f_png');
        return <Card className={`${classes.card} ${classNames}`}>
            <div className={classes.details} id={startup.name}>
                {logo && <CardMedia
                    className={classes.cover}
                    image={logo}
                    title={startup.name}
                />}
                <CardContent className={classes.content}>
                    <Typography variant="caption" align="center" >{startup.description}</Typography>
                    <Typography style={{ marginTop: 4 }} variant="caption" align="center" >{startup.address}</Typography>
                    <List>{startup.contacts.map(Contact)}</List>
                </CardContent>
            </div>
        </Card>;
    }
}

export default withStyles(styles, { withTheme: true })(StartupTooltipCard);