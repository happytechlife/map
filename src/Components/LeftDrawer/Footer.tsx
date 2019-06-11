import * as React from 'react';
import { getHtml } from '../../Utils/Pages/pages';
import * as footerMarkdown from './../../Markdowns/footer.md';

export const Footer = () => {
    const content = getHtml(footerMarkdown);
    return <footer>
        <div dangerouslySetInnerHTML={{ __html: content  }} />
    </footer>
}
