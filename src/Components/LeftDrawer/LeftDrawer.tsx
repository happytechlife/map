
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { IHappyTechStore } from '../../Tables/Store';
import StartupCard from '../StartupCard';
import { Divider } from '@material-ui/core';
import { List } from '@material-ui/core';

interface IProps {

    store?: IHappyTechStore;
}
const drawerWidth = 340;

const styles: any = (theme: any) => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

class LeftDrawer extends React.Component<IProps & { classes: any }, {}> {
    public handleChange = (event: any) => {
        return true;
    };
    public render() {
        const { classes, store } = this.props;

        const drawer = (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor={'left'}
            >
                <div className={`${classes.toolbar} ${classes.logo}`}>
                    <img src="https://res.cloudinary.com/happytech/image/upload/c_fit,w_300,h_60/v1534950160/HappyTechFrance.png" />
                </div>

                <Divider />
                <List>{store && store.startups.map(s => <StartupCard key={s.rowId} startup={s} />)}</List>
            </Drawer>
        );
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    {drawer}
                    {this.props.children}
                </div>
            </div >
        );
    }
}


export default withStyles(styles)(LeftDrawer);
