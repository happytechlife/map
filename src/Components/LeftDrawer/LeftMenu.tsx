import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { IPage } from '../../Utils/Pages/models';
import { menuPages } from '../../Utils/Pages/pages';

export const MenuFromPage = (page: IPage, onLinkClick: () => void) => {
    return LeftMenu(page.menuTitle, page.route, onLinkClick, page.icon);
}
export const LeftMenu = (text: string, link: string, onLinkClick: () => void, Icon?: any) => {
    return <div key={text} className="link_menu">
        <Link to={`/${link}`} onClick={onLinkClick} >
            {text}
        </Link>
    </div>;
}

export const leftMenus = (onLinkClick: () => void) => menuPages().map(p => MenuFromPage(p, onLinkClick));
