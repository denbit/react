import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/index.css';
import {BrowserRouter, } from "react-router-dom";
//import * as serviceWorker from './serviceWorker';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
