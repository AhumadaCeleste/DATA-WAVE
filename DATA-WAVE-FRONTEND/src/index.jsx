import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import {RolProvider} from './CONTEXT/RolContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RolProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </RolProvider>
);
