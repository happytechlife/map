import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import ViewModule from '@material-ui/icons/ViewModule'
// import MapIcon from '@material-ui/icons/Map'
// import Help from '@material-ui/icons/Help'
// import LinkIcon from '@material-ui/icons/Link'
// import GroupWork from '@material-ui/icons/GroupWork'
import { Link } from 'react-router-dom';
import { IMarkdownPage } from '../../Utils/Pages/models';
import { pages } from '../../Utils/Pages/pages';

export const MenuFromMarkdownPage = (page: IMarkdownPage) => {
    return LeftMenu(page.icon, page.menuTitle, page.route);
}
export const LeftMenu = (Icon: any, text: string, link: string) => {
    return <div key={text}>
        <Tooltip placement="right" title={text}><Link to={link} style={{ textDecoration: 'none' }}>
            <ListItem button={true}>
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        </Link></Tooltip>
    </div>;
}

export const leftMenus = () => [
    // LeftMenu(Help, 'Qu’est-ce que la Happytech ?', '/presentation'),
    MenuFromMarkdownPage(pages.presentation),
    LeftMenu(ViewModule, 'Les startups', '/startups'),
    MenuFromMarkdownPage(pages.entreprises)
    // LeftMenu(MapIcon, 'La carte des startups', '/map'),
    // LeftMenu(GroupWork, 'Tags', '/tags'),
    // LeftMenu(Settings, 'Options', '/options'),
    // LeftMenu(LinkIcon, 'Liens', '/startups_chord')
]