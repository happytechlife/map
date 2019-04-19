import * as React from 'react';
import { Link } from 'react-router-dom';
import { IPage } from '../../Utils/Pages/models';
import { menuPages } from '../../Utils/Pages/pages';
import theme from '../../theme';

export const MenuFromPage = (page: IPage, onLinkClick: () => void) => {
    return MainMenu(page.menuTitle, page.route, onLinkClick);
}
export const MainMenu = (text: string, link: string, onLinkClick: () => void) => {
    return <Link to={`/${link}`} onClick={onLinkClick}>
        {text}
    </Link>
}

export const MainMenus = (onLinkClick: () => void) => menuPages().map(p => MenuFromPage(p, onLinkClick));
