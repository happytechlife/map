import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import { ViewModule } from '@material-ui/icons'
import { Map } from '@material-ui/icons'
import LinkIcon from '@material-ui/icons/Link'
import { GroupWork, Settings } from '@material-ui/icons'
import { Link } from 'react-router-dom';

export const LeftMenu = (Icon: any, text: string, link: string) => {
    return <div key={text}>
        <Tooltip placement="right" title={text}><Link to={link}>
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
    LeftMenu(ViewModule, 'Startups', '/startups'),
    LeftMenu(Map, 'Map', '/map'),
    LeftMenu(GroupWork, 'Tags', '/tags'),
    LeftMenu(Settings, 'Options', '/options'),
    LeftMenu(LinkIcon, 'Liens', '/startups_chord')

]