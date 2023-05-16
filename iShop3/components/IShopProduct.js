import React from 'react';
import PropTypes from 'prop-types';

import './IShopProduct.css';

class IShopProduct extends React.Component{

    static propTypes = {
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imageURL: PropTypes.string.isRequired,
        warehouseQuantity: PropTypes.number.isRequired,
        code: PropTypes.number.isRequired,
        selectedRowCode: PropTypes.number,
        callBackSelectedRow: PropTypes.func.isRequired,
        callBackDeleteRow: PropTypes.func.isRequired
    };

    rowSelected = (EO) =>{
        this.props.callBackSelectedRow(this.props.code);
    };

    deleteRow = (EO) =>{
        EO.stopPropagation();
        if(confirm('Would you like to delete?'))
            this.props.callBackDeleteRow(this.props.code, true);
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
                        <span><button>Edit</button></span>
                        <span><button onClick={this.deleteRow}>Delete</button></span>
                    </td>
            </tr>
        );
    };
}

export default IShopProduct;