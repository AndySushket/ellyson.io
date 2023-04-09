import React from 'react';
import '../styles/App.less';
import 'react-bootstrap';
import Routing from "./Routing";
import Header from "./Header";
import {BrowserRouter} from "react-router-dom";
import {StylesProvider} from '@material-ui/core';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends React.Component<{}, {}> {

    render(): React.ReactNode {
        return (
                <div className="App">
                    <MuiThemeProvider>
                        <BrowserRouter>
                            <Header/>
                            <Routing/>
                        </BrowserRouter>
                    </MuiThemeProvider>
                </div>
    );
    }
}

export default App;
