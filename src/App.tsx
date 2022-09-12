import React from 'react';
import './styles/App.less';
import Routing from "./Routing";


class App extends React.Component<{}, {}> {

    constructor(props: {}) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div className="App">
                <Routing/>
            </div>);
    }
}

export default App;
