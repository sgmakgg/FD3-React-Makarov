import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import './MyComponent.css';

class MyComponent extends React.Component {

    static propTypes = {
        projectName: PropTypes.string,
        defaultData: PropTypes.array
    };
    render() {
        return (<Fragment>
                    <div>{this.props.projectName}</div>
                </Fragment>);
    }
}

export default MyComponent;