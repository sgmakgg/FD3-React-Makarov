import React from 'react';

import './List.css'

const List = props =>{
    return(
        <div className='VerticalList'>
            <ul>
                {props.words.map((word,index) =>
                    <li key={index}>
                        {word}
                    </li>)
                }
            </ul>
        </div>
    );
}

export default React.memo(List);