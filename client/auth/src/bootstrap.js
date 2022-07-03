import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Container from "./components/Container";

export const mount = (id) => {
    ReactDOM.render(
        <BrowserRouter>
            <Container>
                <App />
            </Container>
        </BrowserRouter>
       
    
    
    , document.querySelector(`#app`));
}

if(process.env.NODE_ENV === "development") {
    mount(document.querySelector('#app'))
}
