import React, {Fragment} from 'react';

import './Filter.css';
import Controls from "./Controls";
import List from "./List";

const Filter = props =>{
    return(
        <Fragment>
            <Controls></Controls>
            <List words={props.words}></List>
        </Fragment>
    );
}

export default Filter;