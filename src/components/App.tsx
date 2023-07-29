import React from 'react';
import '../styles/App.scss';
import 'react-bootstrap';
import Routing from "./Routing";
import Header from "./Header";
import {BrowserRouter} from "react-router-dom";
// import {StylesProvider} from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import {createTheme} from "@mui/material";

const theme = createTheme({
});

class App extends React.Component<{}, {}> {

    render(): React.ReactNode {
        return (
                <div className="App">
                    <ThemeProvider theme={theme}>
                        <BrowserRouter>
                            <Header/>
                            <Routing/>
                        </BrowserRouter>
                    </ThemeProvider>
                </div>
    );
    }
}

export default App;
