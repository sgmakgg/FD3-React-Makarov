import React from 'react';
import PropTypes from 'prop-types';

import './IShopProduct.css';
import {changeCardPropsEvents, isEditing} from "../ProductCardEditableEvents";

class IShopProduct extends React.Component{

    static propTypes = {
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imageURL: PropTypes.string.isRequired,
        warehouseQuantity: PropTypes.number.isRequired,
        code: PropTypes.number.isRequired,
        selectedRowCode: PropTypes.number,
        callBackSelectingRow: PropTypes.func.isRequired,
        callBackDeletingRow: PropTypes.func.isRequired,
        callbackEditingRow: PropTypes.func.isRequired
    };

    state = {
        buttonsDisabled:false
    };

    componentDidMount() {
        changeCardPropsEvents.addListener(isEditing, this.disableButtons);
    };

    componentWillUnmount() {
        changeCardPropsEvents.removeListener(isEditing, this.disableButtons);
    };

    disableButtons = (flag) => {
        this.setState({buttonsDisabled:flag});
    };

    rowSelected = (EO) =>{
        this.props.callBackSelectingRow(this.props.code);
    };

    deleteRow = (EO) =>{
        EO.stopPropagation();
        if(confirm('Would you like to delete?'))
            this.props.callBackDeletingRow(this.props.code, true);
    };

    editeRow = (EO) =>{
        EO.stopPropagation();
        this.props.callbackEditingRow(this.props.code);
    };

    render(){
        return(
            <tr className='iShopProduct'
                key={this.props.code}
                onClick={this.rowSelected}
                style={{background: (this.props.selectedRowCode === this.props.code) ? 'red' : 'white'}}>
                    <td className='ProductName'>{this.props.name}</td>
                    <td className='ProductPrice'>{this.props.price}</td>
                    <td className='ProductPhoto'>
                        <img className='RowImage' src={this.props.imageURL} alt={this.props.name}/>
                    </td>
                    <td className='ProductQuantity'>{this.props.warehouseQuantity}</td>
                    <td className='ProductControl'>
                        <span><button onClick={this.editeRow} disabled={this.state.buttonsDisabled}>Edit</button></span>
                        <span><button onClick={this.deleteRow} disabled={this.state.buttonsDisabled}>Delete</button></span>
                    </td>
            </tr>
        );
    };
}

export default IShopProduct;