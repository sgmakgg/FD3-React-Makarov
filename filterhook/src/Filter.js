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
            return() => {sortArray()};
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
        setCurrentList(props.words);
    }

    function sortArray(){
        let currentValue = [...props.words];

        if(currentInputText === ''){
            setCurrentList(checkbox ?  currentValue.sort() : currentValue);
        }
        else{
            let result = currentValue.filter(item => item.includes(currentInputText) === true);

            setCurrentList(checkbox ? result.sort() : result);
        }
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