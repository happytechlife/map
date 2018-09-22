
type PagesName = 'presentation' | 'entreprises';
export type MarkdownPages = Record<PagesName, IMarkdownPage>
export interface IMarkdownPage {
    html: string;
    route: string;
    menuTitle: string;
    icon?: any;
    headers: {
        title: string;
    }
}

