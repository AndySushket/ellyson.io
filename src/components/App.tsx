import React from 'react';
import '../styles/App.less';
import 'react-bootstrap';
import Routing from "./Routing";
import Header from "./Header";
import {BrowserRouter} from "react-router-dom";

class App extends React.Component<{}, {}> {

    render(): React.ReactNode {
        return (
            <div className="App">
                <BrowserRouter>
                    <Header/>
                    <Routing/>
                </BrowserRouter>
            </div>);
    }
}

export default App;
