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
                            </tr>;

const emptyClient = {Id: NaN,
                        LastName: '',
                        FirstName: '',
                        Surname: '',
                        Balance: 0};

const sortTypes = {All:'All', Active:'Active', Blocked:'Blocked'}

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
        notSortedClients: this.props.clients,
        editedClient: null,
        wasSorted: false,
        sortType: sortTypes.All
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
    };

    editClient = (id) => this.setState({editedClient: id});

    saveClient = (editedClient) => {
        let copyClients;
        if(!this.state.wasSorted)
            copyClients = [...this.state.clients];
        else
            copyClients = [...this.state.notSortedClients];

        let hasId = false;
        for (const client of copyClients) {
            if(client.Id === editedClient.Id)
                hasId = true;
        }

        if(!hasId){
            copyClients.push(editedClient);
            copyClients = copyClients.filter(client => !isNaN(client.Id))
        }
        else{
            copyClients.forEach((client, index) => {
                if(client.Id === editedClient.Id && !deepEqual(client, editedClient) && !isNaN(client.Id)){
                    copyClients[index] = editedClient;
                }
                if(isNaN(client.Id)){
                    copyClients = copyClients.filter(client => !isNaN(client.Id));
                }
            });
        }

        if(!this.state.wasSorted)
            this.setState({clients:copyClients, editedClient:null});
        else{
            if(this.state.sortType === sortTypes.Blocked)
                this.setState({notSortedClients:copyClients, editedClient:null}, this.sortBlocked);
            if(this.state.sortType === sortTypes.Active)
                this.setState({notSortedClients:copyClients, editedClient:null}, this.sortActive);
        }

    };

    addNewClient = () =>{
        let copyClients = [...this.state.clients];
        copyClients.push(emptyClient);

        this.setState({clients:copyClients, editedClient:null});
    };

    sortAll = () => {
        this.setState({clients: this.state.notSortedClients, wasSorted: false, sortType:sortTypes.All})
    };

    sortActive = () => {
        if(!this.state.wasSorted){
            let copyClients = [...this.state.clients];
            copyClients = copyClients.filter(client => client.Balance > 0);

            this.setState({notSortedClients: this.state.clients,
                                clients: copyClients,
                                wasSorted: true,
                                sortType:sortTypes.Active});
        }

        if(this.state.wasSorted){
            let copyClients = [...this.state.notSortedClients];
            copyClients = copyClients.filter(client => client.Balance > 0);

            this.setState({clients: copyClients, sortType:sortTypes.Active});
        }
    };

    sortBlocked = () => {
        if(!this.state.wasSorted){
            let copyClients = [...this.state.clients];
            copyClients = copyClients.filter(client => client.Balance <= 0);

            this.setState({notSortedClients: this.state.clients,
                                clients: copyClients,
                                wasSorted: true,
                                sortType:sortTypes.Blocked});
        }

        if(this.state.wasSorted){
            let copyClientsNotSorted = [...this.state.notSortedClients];
            copyClientsNotSorted = copyClientsNotSorted.filter(client => client.Balance <= 0);

            this.setState({clients: copyClientsNotSorted, sortType:sortTypes.Blocked});
        }
    }

    render(){
        let clients = this.state.clients.map((client, index) =>
                                                (this.state.editedClient !== client.Id && !isNaN(client.Id))
                                                ?
                                                <MCClient key={client.Id} clientInfo={client}></MCClient>
                                                :
                                                <MCClientEdit key={index} clientInfo={client} newId={index}></MCClientEdit>)

        console.log('render MCClientsList')
        return(
            <Fragment>
                <div className='SortingButtons'>
                    <input type='button' value='All' onClick={this.sortAll}/>
                    <input type='button' value='Active' onClick={this.sortActive}/>
                    <input type='button' value='Blocked' onClick={this.sortBlocked}/>
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
                    <input type='button'
                           value='Add Client' onClick={this.addNewClient}/>
                </div>
            </Fragment>
        );
    };
}

export default MCClientsList;