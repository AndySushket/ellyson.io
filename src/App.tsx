import React from 'react';
import {Button} from 'react-bootstrap';
import './styles/App.less';
import Routing from "./Routing";
import AsidePanel from "./components/AsidePanel.jsx"

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
