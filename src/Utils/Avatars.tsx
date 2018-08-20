import * as React from 'react';

const size = 64;

function getZoneStyle(): React.CSSProperties {
    return {
        borderRadius: '50%',
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        minWidth: `${size}px`,
        maxWidth: `${size}px`,
        height: `${size}px`,
    };
}
function getImageStyle(width: string): React.CSSProperties {
    return {
        width,
        height: '50%',
        overflow: 'hidden',
        flexGrow: 1,
        position: 'relative',
        fontSize: '0px',
    };
}

function renderElements(elements: JSX.Element[], num: number, width: string) {
    return elements.slice(0, num).map((element, index) => <div key={index} style={getImageStyle(width)}>{element}</div>);
}
export const buildMultiAvatar = (elements: JSX.Element[]) => {
    if (elements.length < 2) {
        return <div style={getZoneStyle()}>{elements[0]}</div>
    } else if (elements.length < 3) {
        return <div style={getZoneStyle()}>
            {renderElements(elements, 4, '100%')}
        </div>;
    } else {
        return <div style={getZoneStyle()}>
            {renderElements(elements, 4, '50%')}
        </div>;
    }
}