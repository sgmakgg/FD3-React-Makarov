import React, {useEffect, useState} from 'react';

import './Controls.css';


const Controls = props =>{
    const[checked, setChecked] = useState(false);
    const[inputText, setInputText] = useState('');

    useEffect(
        () =>{
            setChecked(props.checkboxChecked);
            setInputText(props.inputValue);
            return() =>{
                setChecked(props.checkboxChecked);
                setInputText(props.inputValue);
            }
        },
        [props.checkboxChecked, props.inputValue]
    )
    let checkBoxChanged = (EO) => props.cbSortWithCheckbox(EO.target.checked);
    let inputTextChanged = (EO) => props.cbSortWithInput(EO.target.value);
    let resetToDefault = (EO) => {
        props.cbResetToDefault();
        setChecked(false);
        setInputText('');
    }

    return(
            <div className='Controls'>
                <input type='checkbox' onChange={checkBoxChanged} checked={checked}/>
                <input type='text' onChange={inputTextChanged} value={inputText}/>
                <input type='button' value='Reset' onClick={resetToDefault}/>
            </div>
    );
}

export default Controls;