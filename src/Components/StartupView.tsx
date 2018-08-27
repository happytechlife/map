import * as React from 'react';
import { IHappyTechStore } from '../Tables/Store';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Chip, List, withStyles } from '@material-ui/core';

import './StartupCard';
import { cloudinaryTransform } from '../Utils/Cloudinary';
import { Contact } from './StartupCard';
interface IProps {
    store: IHappyTechStore;
    name: string;
    classes: any;
}

const styles: any = (theme: any) => ({
    card: {
        display: 'flex',
        // height: 152,
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
        maxWidth: 300
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
class StartupView extends React.Component<IProps, {}> {
    public render() {
        console.log(this.props);

        const { store, name, classes } = this.props;
        if (!store) {
            return null;
        }
        const { startups } = store;
        const startup = startups.find(s => s.name.toLocaleLowerCase() === name.toLocaleLowerCase())
        if (startup) {
            const logo = cloudinaryTransform(startup.iconUrl, 'w_300,c_fill,g_west');
            return <Card className={`${classes.card}`}>
                <div className={classes.details}>
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
                        <List >{startup.tags.map((t, i) => <Chip key={i} label={t.name} style={{ margin: 2 }} />)}</List>
                        <Typography variant="caption" align="center" >{startup.address}</Typography>
                        <List>{startup.contacts.map(Contact)}</List>
                    </CardContent>
                </div>
            </Card>;
        }
        return null;
    }
}

export default withStyles(styles, { withTheme: true })(StartupView);
