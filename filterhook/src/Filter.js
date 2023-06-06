import React, {Fragment, useEffect, useState} from 'react';

import './Filter.css';
import Controls from "./Controls";
import List from "./List";

const Filter = props =>{

    const[checkbox, setCheckbox] = useState(false);
    const[currentList, setCurrentList] = useState(props.words);
    const[currentInputText, setCurrentInputText] = useState('');

    useEffect(
        () =>{
            sortArray();
        },
        [checkbox, currentInputText]
    );

    function sortWithCheckbox(flag) {
        setCheckbox(flag);
    }

    function sortWithInput(currentText){
        setCurrentInputText(currentText);
    }

    function resetToDefault(){
        setCheckbox(false);
        setCurrentInputText('');
    }

    function sortArray(){
        let currentValue = [...props.words];

        if(currentInputText !== ''){
            currentValue = currentValue.filter(item => item.includes(currentInputText) === true);
        }

        if(checkbox)
            currentValue.sort();

        setCurrentList(currentValue);
    }

    return(
        <Fragment>
            <Controls cbSortWithCheckbox={sortWithCheckbox}
                      cbSortWithInput={sortWithInput}
                      cbResetToDefault={resetToDefault}
                      checkboxChecked = {checkbox}
                      inputValue={currentInputText}></Controls>
            <List words={currentList}></List>
        </Fragment>
    );
}

export default Filter;