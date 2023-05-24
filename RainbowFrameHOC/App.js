import React from 'react';
import ReactDOM from 'react-dom';

import defaultData from './defaultData.json';
import DoubleButton from "./components/DoubleButton";

const caption1 = 'однажды';
const caption2 = 'пору';

const cbPressed = (caption) =>{
    alert(caption);
}

ReactDOM.render(
    <DoubleButton defaultData={defaultData}
                  caption1={caption1}
                  caption2={caption2}
                  cbPressed={cbPressed}>
        в студёную зимнюю
    </DoubleButton>,
    document.getElementById('container')
);