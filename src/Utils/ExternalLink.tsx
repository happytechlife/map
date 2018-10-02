import * as React from 'react';

interface IProps {
    link: string;
    title?: string;
}
export class ExternalLink extends React.Component<IProps> {

    public render() {
        const { link, title, children } = this.props;
        const href = `${link}?utm_source=happytech&utm_medium=website`;
        return <a href={href} title={title} target="_blank" style={{ textDecoration: 'none', color: '#6C6C6C' }}>
            {children}
        </a>;
    }
}


export const externalLinkWithText = (text: string, link: string) => {
    return <ExternalLink link={link}> {text} </ExternalLink>;
}