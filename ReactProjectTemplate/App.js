import React from 'react';
import ReactDOM from 'react-dom';

import defaultData from './defaultData.json';
import MyComponent from "./components/MyComponent";

const projectName = 'projectName';


ReactDOM.render(
    <MyComponent defaultData={defaultData} projectName={projectName}/>,
    document.getElementById('container')
);