import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
// import MapIcon from '@material-ui/icons/Map'
// import Help from '@material-ui/icons/Help'
// import LinkIcon from '@material-ui/icons/Link'
// import GroupWork from '@material-ui/icons/GroupWork'
import { Link } from 'react-router-dom';
import { IPage } from '../../Utils/Pages/models';
import { menuPages } from '../../Utils/Pages/pages';

export const MenuFromPage = (page: IPage, onLinkClick: () => void) => {
    return LeftMenu(page.menuTitle, page.route, onLinkClick, page.icon);
}
export const LeftMenu = (text: string, link: string, onLinkClick: () => void, Icon?: any) => {
    return <div key={text}>
        <Tooltip placement="right" title={text}>
            <Link to={`/${link}`} style={{ textDecoration: 'none' }} onClick={onLinkClick} >
                <ListItem button={true}>
                    {Icon && <ListItemIcon>
                        <Icon />
                    </ListItemIcon>}
                    <ListItemText primary={text} />
                </ListItem>
            </Link>
        </Tooltip>
    </div>;
}

export const leftMenus = (onLinkClick: () => void) => menuPages().map(p => MenuFromPage(p, onLinkClick));