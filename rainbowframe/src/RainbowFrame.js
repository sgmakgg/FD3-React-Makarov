import {Component, Fragment} from "react";
import * as PropTypes from "prop-types";

import './RainbowFrame.css';

export default class RainbowFrame extends Component {

    render() {
        let rainbowHeart = this.props.children;
        for (const color of this.props.colors) {
            rainbowHeart = <div style={{borderColor:`${color}`,
                                        borderStyle:`solid`,
                                        borderWidth:`10px`}}>
                                {rainbowHeart}
                            </div>
        }

        return <Fragment> {rainbowHeart} </Fragment>;
    }
}

RainbowFrame.propTypes = {
    colors: PropTypes.any,
    children: PropTypes.node
};
