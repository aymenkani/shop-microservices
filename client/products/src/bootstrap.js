import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { BrowserRouter } from 'react-router-dom';

export const mount = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
       
    
    
    , document.querySelector(`#app`));
}

if(process.env.NODE_ENV === "development") {
    mount(document.querySelector('#app'))
}
