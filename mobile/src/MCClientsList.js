import React, {Fragment} from "react";
import PropTypes from "prop-types";

import './MCClientsList.css';
import MCClient from "./MCClient";
import {mcClientEvents, isDeleting, isEditing, isSaving} from "./MCClientEvents";
import MCClientEdit from "./MCClientEdit";

import deepEqual from 'deep-equal';

const tableHead = <tr className='TableHead'>
    <th>Last Name</th>
    <th>First Name</th>
    <th>Surname</th>
    <th>Balance</th>
    <th>Status</th>
    <th>Edit</th>
    <th>Delete</th>
</tr>

class MCClientsList extends React.PureComponent{

    static propTypes = {
        clients: PropTypes.arrayOf(
                    PropTypes.shape({
                        Id: PropTypes.number.isRequired,
                        LastName: PropTypes.string.isRequired,
                        FirstName: PropTypes.string.isRequired,
                        Surname: PropTypes.string.isRequired,
                        Balance: PropTypes.number.isRequired
                    })
        )
    };

    state= {
        clients: this.props.clients,
        editedClient: null
    };

    componentDidMount() {
        mcClientEvents.addListener(isDeleting, this.deleteClient);
        mcClientEvents.addListener(isEditing, this.editClient);
        mcClientEvents.addListener(isSaving, this.saveClient);
    };

    componentWillUnmount() {
        mcClientEvents.removeListener(isDeleting, this.deleteClient);
        mcClientEvents.removeListener(isEditing, this.editClient);
        mcClientEvents.removeListener(isSaving, this.saveClient);
    };

    deleteClient = (id) => {
        let copy = [...this.state.clients];
        let clients = copy.filter(client => client.Id !== id);
        this.setState({clients})
    }

    editClient = (id) => this.setState({editedClient: id});

    saveClient = (editedClient) => {
        this.setState({editedClient:null});
        let copyClients = [...this.state.clients];
        copyClients.forEach((client, index) => {
            if(client.Id === editedClient.Id && !deepEqual(client, editedClient)){
                copyClients[index] = editedClient;
            }
        });

        this.setState({clients:copyClients, editedClient:null})
    }

    render(){
        let clients = this.state.clients.map( client => (this.state.editedClient !== client.Id)
                                                        ?
                                                        <MCClient key={client.Id}
                                                                  clientInfo={client}></MCClient>
                                                        :
                                                        <MCClientEdit key={client.Id}
                                                                      clientInfo={client}></MCClientEdit>)

        console.log('render MCClientsList')
        return(
            <Fragment>
                <div className='SortingButtons'>
                    <input type='button' value='All'/>
                    <input type='button' value='Active'/>
                    <input type='button' value='Blocked'/>
                </div>
                <table className='ClientsTable'>
                    <thead>{tableHead}</thead>
                    <tbody>
                        <Fragment>
                            {clients}
                        </Fragment>
                    </tbody>
                </table>
                <div className='AddNewClientButton'>
                    <input type='button' value='Add Client'/>
                </div>
            </Fragment>
        );
    };
}

export default MCClientsList;