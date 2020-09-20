import React, { Component } from 'react';

import WebView from './WebView';

import './main.css';

class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actions: []
        };

        window.ipcRenderer.on('action:added', (event, action) => {
            this.setState({
                actions: [...this.state.actions, action]
            })
        });
    }

    showList = () => {
        return (
            <div>
                <h4>Inputs</h4>
                <ul>
                    {this.state.actions.map(action => {
                        return (
                            <li>
                                {
                                    action.element === 'button' ?
                                        `Clicked ${action.value}` :
                                        `Updated ${action.name} to ${action.value}`
                                }
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <label>Enter URL:</label>
                <input type="label" id="url"></input>
                <input type="button" id="capture" value="Capture Input"></input>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flexGrow: 1 }}>
                        <WebView />
                    </div>
                    {this.showList()}
                </div>
            </React.Fragment>
        );
    }
}

export default MainScreen;