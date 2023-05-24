import React from 'react';
import ReactDOM from 'react-dom';

// import defaultData from './defaultData.json';
// import DoubleButton from "./components/DoubleButton";
import rainbowFrameMaker from "./components/DoubleButton";

const caption1 = 'однажды';
const caption2 = 'пору';

let DoubleButtonHOC = rainbowFrameMaker;

ReactDOM.render(
    <DoubleButtonHOC caption1={caption1}
                  caption2={caption2}
                  cbPressed={caption => alert(caption)}>
        в студёную зимнюю
    </DoubleButtonHOC>,
    document.getElementById('container')
);