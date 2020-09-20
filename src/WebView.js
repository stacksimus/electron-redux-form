import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import './main.css';

class WebView extends Component {
    componentDidMount() {
        const container = ReactDOM.findDOMNode(this.c);

        container.innerHTML = `<webview id="webview" class="page" src="https://redux-form.com/8.2.2/examples/fieldarrays/" nodeintegration/>`;
        this.webview = container.querySelector('webview');

        this.webview.addEventListener('dom-ready', () => {
            const code = `
            const { ipcRenderer } = require('electron');
    
            let inputElements = [];
    
            function inputChange(event) {
                ipcRenderer.send('input:change',event.target.name, event.target.value);
            }
    
            function inputBlur(event) {
                ipcRenderer.send('input:blur',event.target.name);
            }
    
            function buttonClick(event) {
                ipcRenderer.send('button:click', event.target.innerText ? event.target.innerText : event.target.title)
            }

            function checkElements() {
                const inputs = document.querySelectorAll('input,textarea,select');
                for(let index = 0; index < inputs.length; index++) {
                    addInputListeners(inputs[index]);
                }

                const buttons = document.querySelectorAll('button');
                for(let index = 0; index < buttons.length; index++) {
                    addButtonListeners(buttons[index]);
                }
            }

            setInterval(checkElements, 1000);
    
            function addInputListeners(inputElement) {
                inputElements.push(inputElement.name);
                inputElement.addEventListener('input', inputChange);
                inputElement.addEventListener('blur', inputBlur);
            }

            function addButtonListeners(button) {
                button.addEventListener('click', buttonClick);
            }
            `;

            this.webview.executeJavaScript(code);
        });
    }

    render() {
        return <div ref={(c) => { this.c = c; }} />;
    }
}

export default WebView