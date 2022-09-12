import React from 'react';
import {Button} from 'react-bootstrap';
import {BrowserRouter} from "react-router-dom";
import AsidePanel from "./components/AsidePanel.jsx"
import './styles/App.less';
import Routing from "./Routing";
import SomeWorks from "./components/projects/someWorks/Works";
import OtherPeoplesWork from "./components/projects/otherPeoplesWork/otherPeoplesWork";
import Codevember from "./components/projects/codevember/Codevember";
import TestWork from "./components/projects/testWorks/testWork";
import Shaders from "./components/projects/shaders/Shaders";
import MainFunc from "./components/projects/baseFunc/mainFunc";
import MusicVisualization from "./components/projects/musicVisualisation/musicVisual";
import Akella from "./components/projects/Akella/akella";
import TutorialWorks from "./components/projects/tutorials/tutorialWorks";

class App extends React.Component<{}, {}> {

    public state: {
        isPanelOpen: boolean;
    };

    constructor(props: {}) {
        super(props);
        this.state = {
            isPanelOpen: false
        }
    }

    closePanel(): void {
        this.setState({isPanelOpen: false});
    }

    render(): React.ReactNode {
        const {isPanelOpen} = this.state;
        return (
            <div className="App">
                <div>
                    <div className="selectButton">
                        <Button onClick={() => this.setState({isPanelOpen: true})}>Select</Button>
                    </div>
                    <AsidePanel closePanel={this.closePanel.bind(this)} isPanelOpen={isPanelOpen}/>
                </div>
                <Routing/>
            </div>);
    }
}

export default App;
