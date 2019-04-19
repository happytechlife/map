
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
import { MainMenus } from './MainMenu';
import '../../App.css';
import { Hidden } from '@material-ui/core';
import { snLinkedin, snTwitter, snFacebook, snInstagram, snYoutube, snMeetup } from '../../Utils/socialNetworks';

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
        background: theme.palette.common.white,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        boxShadow: 'none',
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        paddingTop: 80,
    },
    menu: {
      display: 'flex',
    }
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
            {leftMenus(this.handleDrawerClose)}
            
            {/*<div style={{ marginRight: 16, marginTop: 16, flexWrap: 'wrap' }} className="flexCenter">
                <div style={{ width: '100%', textAlign: 'center', marginBottom: 8 }}>Suivez nous !</div>
                {snLinkedin('happytech')}
                {snTwitter('happytechfrance')}
                {snFacebook('happytech.life')}
                {snYoutube('happytech.life')}
                {snInstagram('happytech.life')}
                {snMeetup('HappyTech-France')}
            </div>*/}
        </React.Fragment>
    }
    public render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <div>
                        {/* <img src={`https://res.cloudinary.com/happytech/image/upload/c_fit,w_${drawerWidth - 8},h_56/v1534950160/HappyTechFrance.png`} /> */}
                        <img src="https://res.cloudinary.com/happytech/image/upload/c_scale,w_280/v1534950160/HappyTechFrance.png" alt="logo happytech" width='140'/>
                    </div>
                    <Hidden smDown={true}>
                      <div className={classes.menu}>
                          {MainMenus(this.handleDrawerClose)}
                      </div>
                    </Hidden>
                    <Hidden mdUp={true}>
                      <IconButton
                          color="inherit"
                          aria-label="Open drawer"
                          onClick={this.handleDrawerOpen}
                          className={classes.navIconHide}
                      >
                          <Menu />
                      </IconButton>
                    </Hidden>
                </AppBar>

                <Hidden mdUp={true}>
                    <Drawer
                        variant="temporary"
                        anchor={'right'}
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

                <main className={`${classes.content} App`}>
                    {this.props.children}
                </main>
            </div>
        );
    }
}


export default withStyles(styles, { withTheme: true })(LeftDrawer);
