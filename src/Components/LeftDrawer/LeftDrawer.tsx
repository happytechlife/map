
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';
import * as classNames from 'classnames';
import { leftMenus } from './LeftMenu';
import '../../App.css';
import { Hidden } from '@material-ui/core';

interface IProps {
    theme?: any;
}
const drawerWidth = 240;

const styles: any = (theme: any) => ({
    root: {
        flexGrow: 1,
        // height: 440,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,

    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        height: "100%",
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        // padding: theme.spacing.unit * 3,
    },
});

class LeftDrawer extends React.Component<IProps & { classes: any }, { open: boolean }> {
    public state = {
        open: false,
    };
    public handleChange = (event: any) => {
        return true;
    };

    public handleDrawerToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };
    public handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    public handleDrawerClose = () => {
        this.setState({ open: false });
    };


    public insideDrawer() {
        const { classes } = this.props;
        return <React.Fragment>
            <div className={`${classes.toolbar} ${classes.logo}`}>
                <div className="flexCenter" style={{ padding: 4 }}>
                    {/* <img src={`https://res.cloudinary.com/happytech/image/upload/c_fit,w_${drawerWidth - 8},h_56/v1534950160/HappyTechFrance.png`} /> */}
                    <img src="https://res.cloudinary.com/happytech/image/upload/c_scale,w_56/v1525446366/happytechicon.png" alt="logo happytech" />
                </div>
                {/* <img src="https://res.cloudinary.com/happytech/image/upload/c_scale,w_128/v1534592246/logos/happytech_zoom.png" alt="logo happytech" /> */}
                {/* <IconButton onClick={this.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton> */}
            </div>
            <Divider />
            {leftMenus()}
        </React.Fragment>
    }

    public render() {
        const { classes } = this.props;
        const { open } = this.state;

        const drawerPermanent = (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                }}
                open={this.state.open}
            >
                {this.insideDrawer()}
            </Drawer>
        );
        return (
            <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classes.navIconHide}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap={true} style={{ paddingLeft: open ? 0 : 16 }}>
                            HappyTech : L'innovation technologique au service du bien-être en entreprise
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp={true}>
                    <Drawer
                        variant="temporary"
                        anchor={'left'}
                        open={open}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {this.insideDrawer()}
                    </Drawer>

                </Hidden>
                <Hidden smDown={true} implementation="css">
                    {drawerPermanent}
                </Hidden>
                <main className={`${classes.content} App`}>
                    <div className={classes.toolbar} />
                    {this.props.children}
                </main>
            </div>
        );
    }
}


export default withStyles(styles, { withTheme: true })(LeftDrawer);
