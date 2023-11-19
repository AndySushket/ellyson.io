import React from 'react';
import '../styles/App.scss';
import 'react-bootstrap';
import {BrowserRouter} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {createTheme} from "@mui/material";
import Header from "./Header";
import Routing from './Routing';

const theme = createTheme({
});

export default function App() {
    const url = window.location.href;
    const hasVasilika = url.includes('vasilika');
        return (
                <div className="App">
                    <ThemeProvider theme={theme}>
                        <BrowserRouter>
                            {!hasVasilika && <Header/>}
                            <Routing/>
                        </BrowserRouter>
                    </ThemeProvider>
                </div>
        );
    };
