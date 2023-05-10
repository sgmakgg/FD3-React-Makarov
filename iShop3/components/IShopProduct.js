import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

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

        return DOM.tr({key: this.props.code,
                            className:'iShopProduct', 
                            onClick: this.rowSelected, 
                            style: {background: 
                                (this.props.selectedRowCode === this.props.code) ? 'red' : 'white'}},
        DOM.td({className:'productName'}, this.props.name),
        DOM.td({className:'productPrice'}, this.props.price),
        DOM.td({className:'productPhoto'},
            DOM.img({src:this.props.imageURL,
                alt:this.props.name, className:'rowImage'})),
        DOM.td({className:'productQuantity'}, this.props.warehouseQuantity),
        DOM.td({className:'productDelete'},
            DOM.button({onClick: this.deleteRow}, 'Delete'))
        );
    };
}

export default IShopProduct;