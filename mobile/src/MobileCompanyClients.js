import React, {Fragment} from "react";
import PropTypes from "prop-types";

import './MobileCompanyClients.css';
import MCClient from "./MCClient";

const tableHead = <tr className='TableHead'>
    <th>Last Name</th>
    <th>First Name</th>
    <th>Surname</th>
    <th>Balance</th>
    <th>Status</th>
    <th>Edit</th>
    <th>Delete</th>
</tr>

class MobileCompanyClients extends React.PureComponent{

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
        clients: this.props.clients
    };

    render(){
        let clients = this.state.clients.map( client => <MCClient key={client.Id} clientInfo={client}></MCClient>);

        console.log('render MobileCompanyClients')
        return(
            <Fragment>
                <div className='SortingButtons'>
                    <input type='button' value='All'/>
                    <input type='button' value='Active'/>
                    <input type='button' value='Blocked'/>
                </div>
                <table className='ClientsTable'>
                    <thead>{tableHead}</thead>
                    <tbody>{clients}</tbody>
                </table>
                <div className='AddNewClientButton'>
                    <input type='button' value='Add Client'/>
                </div>
            </Fragment>
        );
    };
}

export default MobileCompanyClients;