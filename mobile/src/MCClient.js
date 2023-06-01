import React from 'react';
import PropTypes from 'prop-types';

import './MCClient.css';
import {mcClientEvents, isDeleting, isEditing} from "./MCClientEvents";

class MCClient extends React.PureComponent{

    static propTypes = {
        clientInfo: PropTypes.shape({
            Id: PropTypes.number.isRequired,
            LastName: PropTypes.string.isRequired,
            FirstName: PropTypes.string.isRequired,
            Surname: PropTypes.string.isRequired,
            Balance: PropTypes.number.isRequired
        })
    };

    state ={
        clientInfo: this.props.clientInfo
    };

    deleteEvent = (EO) => mcClientEvents.emit(isDeleting, this.props.clientInfo.Id);
    editEvent = (EO) => mcClientEvents.emit(isEditing, this.props.clientInfo.Id);

    render() {
        console.log('render Client with id ' + this.props.clientInfo.Id)
        return(
            <tr className='Client' key={this.props.clientInfo.Id}>
                <td>{this.state.clientInfo.LastName}</td>
                <td>{this.state.clientInfo.FirstName}</td>
                <td>{this.state.clientInfo.Surname}</td>
                <td>{this.state.clientInfo.Balance}</td>
                {(this.state.clientInfo.Balance > 0)
                    ?
                    <td style={{background: 'green'}}>Active</td>
                    :
                    <td style={{background: 'red'}}>Blocked</td>}
                <td>
                    <input type='button'
                           value='Edit'
                           onClick={this.editEvent}/>
                </td>
                <td>
                    <input type='button'
                           value='Delete'
                           onClick={this.deleteEvent}/>
                </td>
            </tr>
        );
    }
}

export default MCClient;