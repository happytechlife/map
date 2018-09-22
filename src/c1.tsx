import * as React from 'react';

export default class C1 extends React.Component<{}, { count: number }> {
    public state = { count: 0 };
    public inc = () => {
        let { count } = this.state;
        count += 1;
        this.setState({ count });
    }
    public render() {
        const { count } = this.state;
        return <div>
            <div onClick={this.inc}>c1</div>
            <div>{count}</div>
        </div>;
    }

}


