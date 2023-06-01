import React from 'react';
import PropTypes from 'prop-types';

import './MCClientEdit.css';
import {isSaving, mcClientEvents} from "./MCClientEvents";

class MCClientEdit extends React.PureComponent{

    static propTypes = {
        clientInfo: PropTypes.shape({
            Id: PropTypes.number.isRequired,
            LastName: PropTypes.string.isRequired,
            FirstName: PropTypes.string.isRequired,
            Surname: PropTypes.string.isRequired,
            Balance: PropTypes.number.isRequired
        })
    };

    lastNameRef = React.createRef();
    firstNameRef = React.createRef();
    surNameRef = React.createRef();
    balanceRef = React.createRef();

    saveEditedClient =  (EO) => {
        let editedClient = {Id: this.props.clientInfo.Id,
            LastName: this.lastNameRef.current.value,
            FirstName: this.firstNameRef.current.value,
            Surname: this.surNameRef.current.value,
            Balance: parseInt(this.balanceRef.current.value)};

        mcClientEvents.emit(isSaving, editedClient);
    }

    render() {
        console.log('render Client Edit with id ' + this.props.clientInfo.Id)
        return(
            <tr className='Client' key={this.props.clientInfo.Id}>
                <td >
                    <input type='text'
                           style={{border:'none'}}
                           defaultValue={this.props.clientInfo.LastName}
                           ref={this.lastNameRef}/>
                </td>
                <td>
                    <input type='text'
                           style={{border:'none'}}
                           defaultValue={this.props.clientInfo.FirstName}
                           ref={this.firstNameRef}/>
                </td>
                <td>
                    <input type='text'
                           style={{border:'none'}}
                           defaultValue={this.props.clientInfo.Surname}
                           ref={this.surNameRef}/>
                </td>
                <td>
                    <input type='number'
                           min='-1000000'
                           max='1000000'
                           style={{border:'none'}}
                           defaultValue={this.props.clientInfo.Balance}
                           ref={this.balanceRef}/>
                </td>
                <td>
                    Editing...
                </td>
                <td>
                    <input type='button'
                           value='Save' onClick={this.saveEditedClient}/>
                </td>
                <td>
                    <input type='button'
                           value='Delete'
                           disabled/>
                </td>
            </tr>
        );
    }
}


export default MCClientEdit;