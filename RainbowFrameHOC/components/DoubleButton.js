import React from 'react';
import PropTypes from 'prop-types';

import './DoubleButton.css';
import {rainbowFrameMaker} from "./rainbowFrameMaker";
import defaultData from '../defaultData.json';

const key1defaultValue = 'я из лесу';
const key2defaultValue = 'мороз';

class DoubleButton extends React.Component {

    static propTypes = {
        caption1: PropTypes.string,
        caption2: PropTypes.string,
        cbPressed: PropTypes.func
    };

    clickFunc = (EO) =>{
        if(EO.target.value === key1defaultValue){
            this.props.cbPressed(this.props.caption1);
        }

        if(EO.target.value === key2defaultValue){
            this.props.cbPressed(this.props.caption2);
        }
    }

    render() {
        return (<div>
                    <input key = {1}
                           type='button'
                           defaultValue={key1defaultValue}
                           onClick={this.clickFunc}/>
                    <span>{'\xa0вышел,\xa0был\xa0сильный\xa0'}</span>
                    <input key = {2}
                           type='button'
                           defaultValue={key2defaultValue}
                           onClick={this.clickFunc}/>
                </div>);
    }
}

// export default DoubleButton;

export default rainbowFrameMaker(defaultData)(DoubleButton);