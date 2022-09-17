import React from 'react';
import '../styles/App.less';
import 'react-bootstrap';
import Routing from "./Routing";
import Header from "./Header";

class App extends React.Component<{}, {}> {

    render(): React.ReactNode {
        return (
            <div className="App">
                <Header/>
                <Routing/>
            </div>);
    }
}

export default App;
